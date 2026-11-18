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
    <div className="w-[92%] lg:w-[55%] mx-auto pt-8 pb-16 text-white">
      {/* Centered Page Title Header */}
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-white/80 font-semibold mb-2 block drop-shadow-sm">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.2em] uppercase text-white drop-shadow-sm mb-4 select-none">
          CONTACT
        </h1>
        <div className="w-24 h-1 bg-[#1A4D57] rounded-full shadow-sm mx-auto" />
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 sm:p-12 shadow-lg">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-[#1A4D57] text-white rounded-full flex items-center justify-center mx-auto text-2xl shadow-md">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
            <p className="text-white/80 max-w-md mx-auto text-sm leading-relaxed">
              Thank you for reaching out. We have received your message and will
              get back to you as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-6 px-6 py-2.5 text-sm font-medium text-white bg-[#1A4D57] hover:bg-[#153d44] transition-colors rounded-full shadow-sm cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 text-white text-sm rounded-xl">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-white/90 mb-2"
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white/90 mb-2"
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
                  className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-white/90 mb-2"
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
                className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-white/90 mb-2"
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
                className="w-full px-4 py-3 text-sm rounded-xl border border-white/20 bg-white/5 text-white placeholder-white/40 focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#1A4D57] transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-[#1A4D57] hover:bg-[#153d44] active:scale-[0.99] transition-all duration-200 rounded-xl shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Sending Message..." : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Contact;
