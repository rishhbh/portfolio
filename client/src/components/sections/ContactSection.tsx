import { useState, type ChangeEvent, type FormEvent } from 'react';

interface ContactSectionProps {
  theme?: 'dk' | 'lt';
}

export function ContactSection({ theme = 'dk' }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setStatusMessage('Please provide your email address and message.');
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
    <section className={`s ${theme}`} id="dispatch" data-name="Dispatch">
      <div className="w join-layout">
        {/* Right Column: Headline on desktop */}
        <div className="t">
          <p className="eyebrow">
            <span className="eyebrow-line"></span> DIRECT DISPATCH
          </p>
          <h2 className="max-w-[18ch] md:ml-auto">
            Good conversations start with clear problem statements.
          </h2>
          <p className="lead md:ml-auto">
            Open for software engineering roles, backend consulting, and complex pipeline architecture. Direct communication with zero marketing funnels.
          </p>

          <div className="mt-8 space-y-2 text-xs text-[var(--mut)] md:ml-auto md:max-w-[42ch]">
            <p>
              <strong className="text-[var(--fg)] uppercase font-mono">Direct Email:</strong>{' '}
              <a href="mailto:rishabh223300@gmail.com" className="text-[var(--fg)] underline">
                rishabh223300@gmail.com
              </a>
            </p>
            <p>
              <strong className="text-[var(--fg)] uppercase font-mono">Base Location:</strong> Lucknow, India (UTC +5:30)
            </p>
          </div>
        </div>

        {/* Left Column: Form on desktop */}
        <div className="v join-form-wrap border-t border-[var(--line)] pt-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block mb-2 font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
                YOUR NAME
              </label>
              <input
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="f"
                type="text"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block mb-2 font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
                EMAIL ADDRESS
              </label>
              <input
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="f"
                type="email"
                placeholder="jane@company.com"
                required
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block mb-2 font-mono text-xs uppercase tracking-wider text-[var(--mut)]">
                PROJECT CONTEXT / MESSAGE
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="f"
                placeholder="Problem statement, timeline, or engineering role details..."
                required
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="b"
              >
                {status === 'loading' ? 'Dispatching...' : (
                  <>
                    Send message <span aria-hidden="true">↗</span>
                  </>
                )}
              </button>
            </div>

            {statusMessage && (
              <p
                role="status"
                aria-live="polite"
                className={`text-xs mt-3 font-mono ${status === 'error' ? 'text-red-400' : 'text-emerald-400'}`}
              >
                {statusMessage}
              </p>
            )}
          </form>

          <p className="form-note text-xs text-[var(--mut)] mt-6">
            Software engineering roles, backend architecture, and deterministic systems.
          </p>
        </div>
      </div>
    </section>
  );
}
