import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dk border-t border-[#262626] py-8 px-6 sm:px-12 mt-0">
      <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-[#9b9b9b]">
        <div className="flex items-center gap-2">
          <span className="text-white font-serif text-base">rishabh sharma</span>
          <span>© {currentYear}</span>
        </div>

        <span className="font-mono text-[11px] uppercase tracking-wider text-[#777]">
          Deterministic backend pipelines • 0 buzzwords
        </span>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/rishhbh"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/rishabhh-sharma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn ↗
          </a>
          <Link
            to="/resume"
            className="text-white hover:underline"
          >
            Resume ↗
          </Link>
        </div>
      </div>
    </footer>
  );
}
