const fs = require('fs');

let content = fs.readFileSync('client/src/pages/Home.tsx', 'utf8');

const returnRegex = /return \(\s*<div className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-36 lowercase">([\s\S]*?)<\/div>\s*\);\s*}\s*$/;

const newWrapper = `return (
    <div className="min-h-screen lg:flex lowercase">
      {/* LEFT PANEL: Fixed Anchor */}
      <div className="hidden lg:flex lg:w-[45%] lg:fixed lg:left-0 lg:top-0 lg:h-screen flex-col justify-between p-12 xl:p-20 bg-bg border-r border-line z-10">
        <div className="space-y-6 mt-12">
          <div className="w-12 h-1 bg-ink" />
          <h1 className="font-display font-bold text-6xl xl:text-8xl tracking-tighter text-ink leading-[0.85] transition-all duration-700">
            {activeSection === 'hero' && 'RISHABH SHARMA'}
            {activeSection === 'about' && 'CORE STACK'}
            {activeSection === 'work' && 'SELECTED WORK'}
            {activeSection === 'experience' && 'TIMELINE'}
            {activeSection === 'contact' && 'CONTACT'}
          </h1>
          <p className="font-mono text-xs text-ink-dim tracking-widest uppercase transition-all duration-700">
            {activeSection === 'hero' && 'SOFTWARE ENGINEER — AI / ML'}
            {activeSection === 'about' && 'ARCHITECTURES & TECHNOLOGIES'}
            {activeSection === 'work' && 'PROJECTS & CONTRIBUTIONS'}
            {activeSection === 'experience' && 'EXPERIENCE & HACKATHONS'}
            {activeSection === 'contact' && 'INITIATE TRANSMISSION'}
          </p>
        </div>
        
        <div className="w-full max-w-sm">
          <GithubActivity />
        </div>
      </div>

      {/* RIGHT PANEL: Scrollable Content */}
      <div className="w-full lg:w-[55%] lg:ml-[45%] p-6 lg:p-12 xl:p-24 space-y-36">
        $1
      </div>
    </div>
  );
}`;

content = content.replace(returnRegex, newWrapper);

fs.writeFileSync('client/src/pages/Home.tsx', content);
