import React, { useState } from 'react'
import ContactForm from './ContactForm';
import Map from './Map';
import { sendEmail } from '../../../core/services/email';

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: "", email: "", message: ""});
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setForm({ ...form, [e.target.name]: e.target.value }) };
  const submit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendEmail(form);
      alert("Email sent successfully!");
      setForm({ name: "", email: "", message: ""});
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Error sending email.");
    }
  }
  const map = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174502.75368507477!2d44.76021740605285!3d41.71802463422026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61d084ede2576ea3!2sTbilisi!5e1!3m2!1sen!2sge!4v1741282248376!5m2!1sen!2sge";

  return (
    <>
      <div className="max-w-full mx-auto px-2 py-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <ContactForm change={change} form={form} submit={submit} />
          </div>

          {/* Map */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <Map map={map} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactPage;