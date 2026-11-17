import React, { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Replace or extend with your actual API endpoint or email service submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      console.error("Submission failed:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F0] text-slate-950 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 text-xs font-semibold tracking-wider text-[#C85A17] uppercase bg-white rounded-full shadow-sm mb-3">
            Get in Touch
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Have a question, project proposal, or just want to say hello? Drop
            us a message below.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 sm:p-12">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Message Sent!
              </h2>
              <p className="text-slate-600 max-w-md mx-auto">
                Thank you for reaching out. We have received your message and
                will get back to you as soon as possible.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-[#C85A17] hover:bg-[#b04e13] transition-colors rounded-full shadow-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-sm rounded-2xl">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A17] transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A17] transition-all"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration"
                  className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A17] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project or inquiry..."
                  className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A17] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#C85A17] hover:bg-[#b04e13] active:scale-[0.99] transition-all duration-200 rounded-2xl shadow-sm disabled:opacity-50"
              >
                {isSubmitting ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
