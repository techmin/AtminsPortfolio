// components/ContactForm.tsx
import React, { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mzzvbpqn"; // Replace with your own endpoint

interface FormData {
  name: string;
  email: string;
  company: string;
  question: string;
  additional_info?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    question: "",
    additional_info: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          _subject: `New Question from ${formData.name} (${formData.company})`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", question: "", additional_info: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Email send failed:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-center">📧 Contact Me</h2>

      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Your company / org"
        value={formData.company}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <textarea
        name="question"
        placeholder="Your question"
        value={formData.question}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <textarea
        name="additional_info"
        placeholder="Additional info (optional)"
        value={formData.additional_info}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>

      {status === "success" && (
        <p className="text-green-600 text-center mt-2">✅ Message sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-600 text-center mt-2">❌ Failed to send message. Try again later.</p>
      )}
    </form>
  );
};

export default ContactForm;
