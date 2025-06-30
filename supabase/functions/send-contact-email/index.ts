
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, service, message }: ContactEmailRequest = await req.json();

    // Send email to business owner
    const businessEmailResponse = await resend.emails.send({
      from: "CLUB B2B <onboarding@resend.dev>",
      to: ["info@clubb2bperformance.com"], // Replace with your actual email
      subject: `New Contact Form Submission - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #000; text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px;">
            CLUB B2B PERFORMANCE
          </h1>
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Service Interest:</strong> ${service}</p>
            <p><strong>Message:</strong></p>
            <p style="background: white; padding: 15px; border-radius: 4px;">${message}</p>
          </div>
        </div>
      `,
    });

    // Send confirmation email to customer
    const confirmationEmailResponse = await resend.emails.send({
      from: "CLUB B2B Performance <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting CLUB B2B Performance",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #000; color: #fff;">
          <h1 style="color: #fff; text-align: center; border-bottom: 2px solid #fff; padding-bottom: 10px;">
            CLUB B2B PERFORMANCE
          </h1>
          <h2 style="color: #fff;">Thank you for your inquiry, ${name}!</h2>
          <div style="background: #333; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>We have received your message regarding <strong>${service}</strong> and will get back to you within 24 hours.</p>
            <p>For immediate assistance, please contact us via:</p>
            <ul>
              <li>WhatsApp: +1 518-507-7243</li>
              <li>Instagram: @CLUB_B2B</li>
            </ul>
            <p style="margin-top: 30px;">Best regards,<br><strong>CLUB B2B Performance Team</strong></p>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
