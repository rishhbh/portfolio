import { HeroSection } from '../components/sections/HeroSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { ContactSection } from '../components/sections/ContactSection';
import { useMotionReveal } from '../hooks/useMotionReveal';

export default function Home() {
  useMotionReveal();

  return (
    <div className="w-full relative">
      <HeroSection />
      <ProblemSection />
      <ContactSection theme="dk" />
    </div>
  );
}
