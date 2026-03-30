const ContactForm = ({ submit, form, change }: {
  submit: (e: React.SubmitEvent<HTMLFormElement>) => Promise<void>;
  form: { name: string; email: string; message: string };
  change: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void }
) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>
      {/* FORM */}
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input type="text" name="name" value={form.name} onChange={change} placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="email" value={form.email} onChange={change} placeholder="your-email@example.com"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea name="message" rows={4} value={form.message} onChange={change} placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <button type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </>
  );
}

export default ContactForm;