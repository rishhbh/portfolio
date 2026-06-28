import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/rishhbh',
      icon: <Github className="w-4 h-4" />,
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/rishabhh-sharma',
      icon: <Linkedin className="w-4 h-4" />,
    },
    {
      name: 'Email',
      url: 'mailto:rishabh223300@gmail.com',
      icon: <Mail className="w-4 h-4" />,
    },
  ];

  return (
    <footer className="border-t border-line bg-bg py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Credit */}
        <div className="text-ink-faint text-xs font-mono tracking-wider">
          © {currentYear} RISHABH SHARMA. ALL RIGHTS RESERVED.
        </div>

        {/* Links */}
        <div className="flex items-center space-x-6">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-dim hover:text-ink transition-colors flex items-center gap-2 font-mono text-xs tracking-wider"
              aria-label={social.name}
            >
              {social.icon}
              <span className="hidden sm:inline">{social.name.toUpperCase()}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
