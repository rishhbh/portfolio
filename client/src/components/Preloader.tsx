import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

const BOOT_LOGS = [
  "[    0.000000] Linux version 7.0.0-arch1-1 (linux@archlinux) (gcc (GCC) 14.1.1 20240522)",
  "[    0.000000] Command line: BOOT_IMAGE=/vmlinuz-linux root=UUID=xxxx-xxxx rw quiet",
  "[    0.000000] BIOS-provided physical RAM map:",
  "[    0.000000] BIOS-e820: [mem 0x0000000000000000-0x000000000009fbff] usable",
  "[    0.000000] BIOS-e820: [mem 0x000000000009fc00-0x000000000009ffff] reserved",
  "[    0.038192] DMI: System boot-up sequence initialized.",
  "[    0.040211] smpboot: CPU0: Intel(R) Core(TM) i9-14900K",
  "[    0.051239] secureboot: Secure boot could not be determined",
  "[    0.082212] PCI: Using ACPI for IRQ routing",
  "[    0.104442] NetLabel: Initializing",
  "[    0.158888] clocksource: jiffies: mask: 0xffffffff max_cycles: 0xffffffff",
  "[    0.180000] pnp: PnP ACPI: found 14 devices",
  "[    0.202222] NET: Registered PF_INET protocol family",
  "[    0.345678] systemd[1]: Inserted module 'autofs4'",
  "[    0.456789] systemd[1]: Found device /dev/disk/by-uuid/system-root",
  "[    0.567890] systemd[1]: Starting File System Check...",
  "[    0.789012] systemd[1]: Mounting /...",
  "[    0.890123] EXT4-fs (sda1): mounted filesystem with ordered data mode.",
  "[    1.001234] systemd[1]: Mounted /.",
  "[    1.112345] systemd[1]: Reached target Local File Systems.",
  "[    1.223456] systemd[1]: Starting Network Manager...",
  "[    1.334567] systemd[1]: Started Network Manager.",
  "[    1.556789] systemd[1]: Starting Login Service...",
  "[    1.778901] [ OK ] INITIALIZING RISHABH SHARMA KERNEL...",
  "[    1.889012] [ OK ] LOADING MODULES: NODE.JS, DOCKER, AWS...",
  "[    2.000000] SYSTEM ONLINE. WELCOME."
];

export function Preloader({ onComplete }: PreloaderProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: number | ReturnType<typeof setTimeout>;

    const showNextLog = () => {
      if (currentIndex < BOOT_LOGS.length) {
        setLogs((prev) => [...prev, BOOT_LOGS[currentIndex]]);
        currentIndex++;
        
        let delay = Math.random() * 40; 
        if (currentIndex > BOOT_LOGS.length - 4) {
           delay = 200 + Math.random() * 200; // Slower for final status messages
        }
        
        timeoutId = setTimeout(showNextLog, delay);
      } else {
        timeoutId = setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    timeoutId = setTimeout(showNextLog, 50);

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [logs]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg flex flex-col p-4 sm:p-8 overflow-hidden font-mono text-[10px] sm:text-xs text-ink-dim"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 0.5, ease: "easeOut" } 
      }}
    >
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-full flex flex-col gap-1 pb-4">
          {logs.map((log, index) => (
            <div key={index} className={
                log?.includes("SYSTEM ONLINE") ? "text-green-500 font-bold" : 
                log?.includes("[ OK ]") ? "text-ink" : ""
            }>
              {log}
            </div>
          ))}
          <div ref={bottomRef} />the
        </div>
      </div>
    </motion.div>
  );
}
