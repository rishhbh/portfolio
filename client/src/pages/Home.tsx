import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSound } from '../hooks/useSound';
import { HeroSection } from '../components/sections/HeroSection';
import { SelectedWorkSection } from '../components/sections/SelectedWorkSection';
import { TechStackSection } from '../components/sections/TechStackSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { ContactSection } from '../components/sections/ContactSection';

export default function Home() {
  const location = useLocation();
  const { playKeystroke } = useSound();

  // Scroll to hash targets if specified in location
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-24 space-y-24">
      <HeroSection />
      <SelectedWorkSection playKeystroke={playKeystroke} />
      <TechStackSection />
      <ExperienceSection />
      <ContactSection playKeystroke={playKeystroke} />
    </div>
  );
}
