import { SelectedWorkSection } from '../components/sections/SelectedWorkSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { useMotionReveal } from '../hooks/useMotionReveal';

export default function WorkPage() {
  useMotionReveal();

  return (
    <div className="w-full relative">
      <SelectedWorkSection />
      <ExperienceSection theme="lt" />
    </div>
  );
}
