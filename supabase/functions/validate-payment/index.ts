import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PaymentValidationRequest {
  amount: number;
  currency: string;
  payment_method: string;
  crypto_currency?: string;
}

interface CurrencyConfig {
  code: string;
  min: number;
  max: number;
  decimals: number;
}

const currencies: CurrencyConfig[] = [
  { code: 'USD', min: 1, max: 1000000, decimals: 2 },
  { code: 'EUR', min: 1, max: 1000000, decimals: 2 },
  { code: 'GBP', min: 1, max: 1000000, decimals: 2 },
  { code: 'CAD', min: 1, max: 1000000, decimals: 2 },
  { code: 'AUD', min: 1, max: 1000000, decimals: 2 },
  { code: 'JPY', min: 100, max: 100000000, decimals: 0 },
  { code: 'CHF', min: 1, max: 1000000, decimals: 2 },
  { code: 'CNY', min: 1, max: 10000000, decimals: 2 }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();

    if (authError || !user) {
      console.error('Authentication failed:', authError);
      return new Response(
        JSON.stringify({ error: 'Unauthorized', valid: false }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Payment validation request from user: ${user.id}`);

    const { amount, currency, payment_method, crypto_currency }: PaymentValidationRequest = await req.json();

    // 1. Rate Limiting Check - max 10 payment attempts per hour per user
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: recentPayments, error: rateLimitError } = await supabaseClient
      .from('enhanced_payments')
      .select('id')
      .eq('user_id', user.id)
      .gte('created_at', oneHourAgo);

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
      return new Response(
        JSON.stringify({ error: 'Rate limit check failed', valid: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (recentPayments && recentPayments.length >= 10) {
      console.warn(`Rate limit exceeded for user ${user.id}: ${recentPayments.length} payments in last hour`);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Maximum 10 payment attempts per hour.',
          valid: false,
          code: 'RATE_LIMIT_EXCEEDED'
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Amount Validation
    if (typeof amount !== 'number' || isNaN(amount) || !isFinite(amount)) {
      console.warn(`Invalid amount format: ${amount}`);
      return new Response(
        JSON.stringify({ error: 'Invalid amount format', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 3. Currency-specific validation
    const currencyConfig = currencies.find(c => c.code === currency);
    if (!currencyConfig) {
      console.warn(`Invalid currency: ${currency}`);
      return new Response(
        JSON.stringify({ error: 'Invalid currency', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check minimum amount
    if (amount < currencyConfig.min) {
      console.warn(`Amount below minimum: ${amount} < ${currencyConfig.min} ${currency}`);
      return new Response(
        JSON.stringify({ 
          error: `Minimum amount is ${currencyConfig.min} ${currency}`,
          valid: false,
          code: 'AMOUNT_TOO_LOW'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check maximum amount
    if (amount > currencyConfig.max) {
      console.warn(`Amount exceeds maximum: ${amount} > ${currencyConfig.max} ${currency}`);
      return new Response(
        JSON.stringify({ 
          error: `Maximum amount is ${currencyConfig.max.toLocaleString()} ${currency}`,
          valid: false,
          code: 'AMOUNT_TOO_HIGH'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check decimal places
    const decimalPlaces = (amount.toString().split('.')[1] || '').length;
    if (decimalPlaces > currencyConfig.decimals) {
      console.warn(`Invalid decimal places for ${currency}: ${decimalPlaces} > ${currencyConfig.decimals}`);
      return new Response(
        JSON.stringify({ 
          error: currencyConfig.decimals === 0 
            ? `${currency} does not support decimal amounts`
            : `${currency} supports maximum ${currencyConfig.decimals} decimal places`,
          valid: false,
          code: 'INVALID_DECIMALS'
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 4. Payment method validation
    const validMethods = ['card', 'crypto', 'wire', 'paypal'];
    if (!validMethods.includes(payment_method)) {
      console.warn(`Invalid payment method: ${payment_method}`);
      return new Response(
        JSON.stringify({ error: 'Invalid payment method', valid: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 5. Crypto-specific validation
    if (payment_method === 'crypto') {
      const validCryptos = ['BTC', 'ETH', 'USDC', 'USDT', 'BNB', 'ADA'];
      if (!crypto_currency || !validCryptos.includes(crypto_currency)) {
        console.warn(`Invalid crypto currency: ${crypto_currency}`);
        return new Response(
          JSON.stringify({ error: 'Invalid cryptocurrency', valid: false }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      // Minimum $10 USD equivalent for crypto
      if (amount < 10) {
        console.warn(`Crypto payment below minimum: ${amount}`);
        return new Response(
          JSON.stringify({ 
            error: 'Minimum amount for cryptocurrency payments is $10 USD equivalent',
            valid: false,
            code: 'CRYPTO_MINIMUM_NOT_MET'
          }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // 6. Check for suspicious patterns - multiple failed payments
    const { data: failedPayments, error: failedPaymentsError } = await supabaseClient
      .from('enhanced_payments')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'failed')
      .gte('created_at', oneHourAgo);

    if (failedPaymentsError) {
      console.error('Failed payments check error:', failedPaymentsError);
    } else if (failedPayments && failedPayments.length >= 5) {
      console.warn(`Suspicious activity: ${failedPayments.length} failed payments for user ${user.id}`);
      return new Response(
        JSON.stringify({ 
          error: 'Multiple failed payment attempts detected. Please contact support.',
          valid: false,
          code: 'SUSPICIOUS_ACTIVITY'
        }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // All validations passed
    console.log(`Payment validation successful for user ${user.id}: ${amount} ${currency}`);
    
    return new Response(
      JSON.stringify({ 
        valid: true,
        message: 'Payment validation successful',
        validated_amount: Number(amount.toFixed(currencyConfig.decimals))
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Payment validation error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Payment validation failed',
        valid: false 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
