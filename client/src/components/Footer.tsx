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
    <footer className="border-t-3 border-black bg-bg-soft py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Credit */}
        <div className="text-ink font-bold text-xs uppercase tracking-wider bg-brutal-yellow text-black border-2 border-black px-3 py-1 shadow-[2px_2px_0px_#000] rounded-none">
          © {currentYear} RISHABH SHARMA. ALL RIGHTS RESERVED.
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-softer text-ink hover:bg-brutal-yellow hover:text-black border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none p-2 transition-all flex items-center gap-2 font-bold text-xs uppercase rounded-none"
              aria-label={social.name}
            >
              {social.icon}
              <span className="hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
