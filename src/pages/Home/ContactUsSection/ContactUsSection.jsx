import React from 'react';

const ContactUsSection = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-500 to-cyan-600 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-200 mb-8">
          Have questions or need assistance? Reach out to us. We are here to help!
        </p>

        {/* Contact Form */}
        <form className="max-w-md mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">Your Name</label>
              <input type="text" id="name" name="name" className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-800" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-1">Your Email</label>
              <input type="email" id="email" name="email" className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-800" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-1">Your Message</label>
            <textarea id="message" name="message" rows="4" className="w-full py-2 px-3 border border-gray-300 rounded-md bg-white text-gray-800"></textarea>
          </div>

          <div className="mt-6">
            <button type="submit" className="bg-white text-blue-500 py-2 px-6 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition duration-300">Send Message</button>
          </div>
        </form>

        {/* Contact Number */}
        <div className="mt-8">
          <p className="text-lg font-semibold">Contact Number:</p>
          <p className="text-2xl font-bold">(+880) 1716285196</p>
        </div>
      </div>
    </section>
  );
};

export default ContactUsSection;
