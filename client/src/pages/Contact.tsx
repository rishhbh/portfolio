import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '../components/SplitText';

interface ContactProps {
  onNavigate: (id: string, path: string) => void;
}

export const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please enter your email and message.');
      return;
    }

    setStatus('loading');
    setStatusMessage('');

    const contactApiEndpoint = import.meta.env.VITE_API_URL
      ? `${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/contact`
      : '/api/contact';

    try {
      const res = await fetch(contactApiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setStatusMessage('Message sent successfully. I will get back to you shortly.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage('Unable to send via automated dispatch. Please email directly at rishabh223300@gmail.com.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Network error. Please email directly at rishabh223300@gmail.com.');
    }
  };

  return (
    <div className="wrap">
      <SplitText tag="h1" text="Contact" className="page-title" delay={150} />

      {/* Direct Contact Channels */}
      <div className="items contact">
        <motion.div
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        >
          <p className="label">Email</p>
          <div className="body">
            <a className="mono link-ink" href="mailto:rishabh223300@gmail.com">
              rishabh223300@gmail.com
            </a>
          </div>
        </motion.div>

        <motion.div
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <p className="label">GitHub</p>
          <div className="body">
            <a
              className="mono link-ink"
              href="https://github.com/rishhbh"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/rishhbh
            </a>
          </div>
        </motion.div>

        <motion.div
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.19 }}
        >
          <p className="label">LinkedIn</p>
          <div className="body">
            <a
              className="mono link-ink"
              href="https://linkedin.com/in/rishabhh-sharma"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/rishabhh-sharma
            </a>
          </div>
        </motion.div>

        <motion.div
          className="item"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        >
          <p className="label">Location</p>
          <div className="body">
            <span className="mono text-[var(--muted)]">Lucknow, India (UTC +5:30)</span>
          </div>
        </motion.div>
      </div>

      {/* Direct Dispatch Message Form */}
      <motion.div
        className="mt-16 pt-10 border-t border-[var(--rule)] max-w-xl"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <h2 className="font-serif text-2xl mb-2">Direct Dispatch</h2>
        <p className="text-sm text-[var(--muted)] mb-6">
          Open for backend engineering roles, systems architecture consulting, and high-concurrency pipeline development.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block font-mono text-xs uppercase text-[var(--muted)] mb-1"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Jane Doe"
              className="editorial-input"
            />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="block font-mono text-xs uppercase text-[var(--muted)] mb-1"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              required
              className="editorial-input"
            />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block font-mono text-xs uppercase text-[var(--muted)] mb-1"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="System specifications, bottlenecks, or problem statement..."
              required
              className="editorial-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="editorial-btn"
          >
            {status === 'loading' ? 'Dispatching...' : 'Dispatch Message →'}
          </button>

          {statusMessage && (
            <p
              className={`mt-3 text-xs font-mono ${
                status === 'success' ? 'text-green-500' : 'text-red-400'
              }`}
            >
              {statusMessage}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
