import { useState, useRef, memo, type ChangeEvent, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { BlurFade } from '../BlurFade';
import { TextReveal } from '../TextReveal';

interface ContactSectionProps {
  playKeystroke?: () => void;
}

export const ContactSection = memo(function ContactSection({ playKeystroke }: ContactSectionProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (playKeystroke) playKeystroke();
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (playKeystroke) playKeystroke();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mqaeedaa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Failed to connect to the server.');
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 mb-24 space-y-8">
      <TextReveal delay={0.1} className="w-full">
        <div className="flex items-center justify-between border-b-3 border-black pb-3">
          <h2 className="text-3xl sm:text-5xl font-black uppercase text-ink flex items-center gap-3">
            <span>04 // CONTACT</span>
            <span className="text-outline hidden sm:inline">& DIRECT DISPATCH</span>
          </h2>
          <span className="bg-btn-primary text-btn-primary-text font-extrabold text-xs px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] rounded-none uppercase">
            COMMUNICATION CHANNEL
          </span>
        </div>
      </TextReveal>

      <BlurFade delay={0.2}>
        <div className="border-3 border-black bg-bg-soft shadow-[6px_6px_0px_#000] rounded-none grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 p-6 sm:p-10 space-y-6 border-b-3 lg:border-b-0 lg:border-r-3 border-black bg-bg-softer flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-black uppercase tracking-wider text-ink border-b-2 border-black pb-2">
                // Initiate Connection
              </div>

              <h3 className="font-black text-3xl sm:text-4xl text-ink uppercase leading-tight">
                Let's Build Scale.
              </h3>

              <p className="text-ink-dim text-sm font-medium leading-relaxed">
                Open to software engineering roles, backend consulting, or technical collaborations. Feel free to drop a message or send an email directly.
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t-2 border-black">
              <div className="border-b border-black/20 pb-3">
                <span className="text-[10px] font-bold text-ink-faint block uppercase">Email Address</span>
                <a href="mailto:rishabh223300@gmail.com" className="text-sm font-extrabold text-ink underline hover:text-ink-dim transition-colors">
                  rishabh223300@gmail.com
                </a>
              </div>

              <div className="border-b border-black/20 pb-3">
                <span className="text-[10px] font-bold text-ink-faint block uppercase">Base Location</span>
                <span className="text-sm font-extrabold text-ink uppercase">Lucknow, India (UTC +5:30)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Dispatch Form */}
          <div className="lg:col-span-7 p-6 sm:p-10">
            {status === 'success' ? (
              <div className="p-8 border-3 border-black bg-btn-primary text-btn-primary-text font-bold shadow-[4px_4px_0px_#000] rounded-none space-y-3">
                <div className="font-black text-2xl uppercase">Message Dispatched Successfully</div>
                <div className="text-sm font-mono">Thank you for reaching out. I will respond to your message promptly.</div>
              </div>
            ) : (
              <form 
                ref={formRef}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-ink uppercase mb-1.5">Your Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-btn-primary focus:text-btn-primary-text transition-colors rounded-none shadow-[3px_3px_0px_#000]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-ink uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-btn-primary focus:text-btn-primary-text transition-colors rounded-none shadow-[3px_3px_0px_#000]"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-ink uppercase mb-1.5">Message / Inquiry Details</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-bg-softer border-3 border-black p-3.5 text-sm text-ink font-bold focus:outline-none focus:bg-btn-primary focus:text-btn-primary-text transition-colors resize-none rounded-none shadow-[3px_3px_0px_#000]"
                      placeholder="Write your project details or job opportunity..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {status === 'error' && <span className="text-xs font-bold text-ink">Error: {errorMessage}</span>}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="brutal-btn py-4 px-8 text-sm uppercase tracking-wide ml-auto flex items-center gap-2 rounded-none"
                  >
                    {status === 'loading' ? 'Dispatching...' : 'Dispatch Message'} <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </BlurFade>
    </section>
  );
});
