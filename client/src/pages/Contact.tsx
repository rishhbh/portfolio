import { TextReveal } from '../components/TextReveal';

export default function Contact() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-36 lowercase">
      <section className="space-y-12">
        <TextReveal delay={0.1} className="w-full">
          <div className="flex items-center gap-4 pb-2">
            <span className="font-mono text-xs text-ink-faint">GET IN TOUCH</span>
            <div className="h-px flex-1 bg-line" />
            <h2 className="font-display font-bold text-2xl tracking-tight lowercase text-ink gradient-heading">
              Let's build something that ships.
            </h2>
          </div>
        </TextReveal>
      </section>
    </div>
  );
}
