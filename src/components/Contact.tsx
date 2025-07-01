
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import ContactCTA from "./ContactCTA";

const Contact = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black" id="contact">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light mb-6 text-white tracking-wider">
            GET IN TOUCH
          </h2>
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto font-light">
            Ready to join the exclusive world of luxury automotive excellence? Contact us today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-8">
            <ContactInfo />
            <ContactCTA />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
