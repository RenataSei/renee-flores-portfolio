import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import './CliTerminal.css';
import asciiArt from '../assets/ascii-art.txt?raw';

interface CliTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onContactClick: () => void;
}

interface LogEntry {
  id: string;
  command?: string;
  content: React.ReactNode;
}

const COMMAND_LIST = [
  'help',
  'bio',
  'about',
  'skills',
  'projects',
  'contact',
  'resume',
  'games',
  'ddos-defenders',
  'neofetch',
  'sysinfo',
  'mriya',
  'mocchi',
  'coffee',
  'pixelsort',
  'sort',
  'sort test',
  'clear',
  'exit',
  'quit'
];

const NEOFETCH_ASCII = `@@@@@@@@@@@@@@@@@@#.:...::......@@@@@@@@@@@@@@@@
@@@@@@@@@@@@@@@#..:@@@@@@@@@@@@-*..@@@@@@@@@@@@@
@@@@@@@@@@@@@=..%@@.-...=..*:..#@@:..@@@@@@@@@@@
@@@@@@@.-.@@=.#@...=..%#+=@.@@@.-.%@.*.@@@@@@@@@
@@@@@@*...-..@::-.*.-...:@#%:..#.+..@%:-@@@@@@@@
@@@@@.......@.#..-..:.*=@@-*.##.*...-.@..@@@@@@@
@@@@@*.#...@=-.=...-..:-+=:*...:....:....@@@@@@@
@@@@:..*.=...-..+..:.=+@-@@..:-.=...+..#.:@@@@@@
@@@@@-=......-.......-#.@..#@@.....%:.=#..@@@@@@
@@@@@.....-:.:..%.**@%*.--*@@@.=.....:=...@@@@@@
@@@@*:.@:.:.:-..:@@@@@@@@@@@@@@@@:.:.-+:-.@@@@@@
@@@@.=..:......@@+.:@@@@@@@@@@...-@==..=*.+@@@@@
@@@@*-.-...-+..@:@@@@@:@@@@@@@@#%#+++#.##@@@%#@@
@@@@-@--@%.+:+-@@....@@....@@@.:..@*=#...@@@@@@@
@@@@%@........%%@=..*@@@@@@@@@*..@@.......-@@@@@
@@@:-#@@....-..:@@@@@@@#@@@-@@@@@@@.-......@@@@@
@@.@%.=@....@.+.+@@@@*@@@@@@@@@@@@-#..-....@@@@@
@@@@..@@.......:.@@@@@@.....@@@@@@...#.....@@@@@
@@@..@@@......-...@@@@@@..:@@@@@=...+%*:...@@@@@
@:@@@@@@.:...@..:..-.@@@@@@@@@.......+...:.@@@@@
@@@@@@@@:*.#.%@.:..=.-:.....=*......-@...:#@@@@@
@@@@@@@@:.#.*.@+.-.@*:.@@@@@...+....*%.+#::@@@@@
@@@@@@@@==.:@..#:=:*@@:@@@@@=@@@.-..=.@=.:.@@@@@
@@@@@@@@@.....=*@.@@@@@@+@@@@@@@@@.#..@..#*@@@@@
@@@@@@@@@..-=-:-@@.@@@@@+..@@@@@+@@:==...%@@@@@@
@@@@@@@@@@.@@#-=.@@#@@.@@@@%.%@@@@-.:.%@@.@@@@@@
@@@@@@@@@@@@@@==-+@@+@@@@*@%@@.@@*%*=%@@-@..@@@@`;

export const CliTerminal: React.FC<CliTerminalProps> = ({
  isOpen,
  onClose,
  onContactClick,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: 'init-1',
      content: (
        <div>
          <span className="cli-cyan cli-bold">FLORES-OS v2.4.0 (x86_64-homelab)</span>
          <br />
          <span className="cli-muted">Type </span>
          <span className="cli-cyan cli-bold">help</span>
          <span className="cli-muted"> for available system commands or </span>
          <span className="cli-purple cli-bold">games</span>
          <span className="cli-muted"> to view arcade modules.</span>
          <br />
          <span className="cli-muted">Press </span>
          <kbd className="cli-cyan">ESC</kbd>
          <span className="cli-muted"> or type </span>
          <span className="cli-cyan">exit</span>
          <span className="cli-muted"> to return to viewport.</span>
        </div>
      ),
    },
  ]);

  // Focus input on open & keep focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [logs]);

  if (!isOpen) return null;

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const lower = trimmed.toLowerCase();

    if (!trimmed) {
      setLogs((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          command: '',
          content: null,
        },
      ]);
      return;
    }

    // Add to command history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (lower) {
      case 'help':
        output = (
          <div>
            <div className="cli-bold cli-cyan">Available System Commands:</div>
            <div className="cli-table">
              <span className="cli-table-cmd">help</span>
              <span className="cli-table-desc">Display command reference table</span>

              <span className="cli-table-cmd">bio / about</span>
              <span className="cli-table-desc">Developer dossier & engineering background</span>

              <span className="cli-table-cmd">skills</span>
              <span className="cli-table-desc">Core languages, tech stacks & telemetry</span>

              <span className="cli-table-cmd">projects</span>
              <span className="cli-table-desc">Key systems, client commissions & tools</span>

              <span className="cli-table-cmd">games</span>
              <span className="cli-table-desc">List installed arcade modules & simulators</span>

              <span className="cli-table-cmd">ddos-defenders</span>
              <span className="cli-table-desc">Launch retro Space Invaders arcade module</span>

              <span className="cli-table-cmd">neofetch / sysinfo</span>
              <span className="cli-table-desc">Hardware specs, telemetry & classic ASCII badge</span>

              <span className="cli-table-cmd">mriya / sei</span>
              <span className="cli-table-desc">Full 168-column uncropped VTuber concept portrait</span>

              <span className="cli-table-cmd">contact</span>
              <span className="cli-table-desc">Channels, direct line & smooth scroll trigger</span>

              <span className="cli-table-cmd">resume</span>
              <span className="cli-table-desc">Direct engineer CV / credential links</span>

              <span className="cli-table-cmd">clear</span>
              <span className="cli-table-desc">Clear current terminal buffer</span>

              <span className="cli-table-cmd">exit / quit</span>
              <span className="cli-table-desc">Dismiss CLI terminal deck [ESC]</span>
            </div>
          </div>
        );
        break;

      case 'bio':
      case 'about':
        output = (
          <div>
            <div className="cli-cyan cli-bold">Reneé Flores // Full-Stack Systems & AI Developer</div>
            <div className="cli-output">
              DLSU-D BIT45 Graduate. Specializing in high-performance Web Applications (React, TypeScript,
              Node.js), Enterprise Backend (.NET / C#, Python, MERN), and Agentic AI Architecture.
              <br />
              Passionate about ISO 25010 software quality compliance, low-latency network telemetry, and
              clean engineering. Drives Honda BR-V "Mocchi", brews artisanal pistachio kunafa mocha, and mains
              Support peel gods.
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div>
            <div className="cli-bold cli-purple">System Capabilities & Tech Stack:</div>
            <div className="cli-table">
              <span className="cli-table-cmd cli-cyan">Frontend</span>
              <span className="cli-table-desc">React 19, TypeScript, Vite, Vanilla CSS Design Systems, Responsive UI</span>

              <span className="cli-table-cmd cli-cyan">Backend</span>
              <span className="cli-table-desc">Node.js / Express, ASP.NET Core / C#, Python, RESTful & WebSocket APIs</span>

              <span className="cli-table-cmd cli-cyan">Database</span>
              <span className="cli-table-desc">MongoDB, PostgreSQL, SQLite, Redis, JSON Telemetry Data Stores</span>

              <span className="cli-table-cmd cli-cyan">AI & Agentic</span>
              <span className="cli-table-desc">Google Gemini SDK, Antigravity Customizations, Agentic Tooling, LLM Pipelines</span>

              <span className="cli-table-cmd cli-cyan">Hardware/OS</span>
              <span className="cli-table-desc">Linux Homelab, Undervolted Hardware Tuning (1545 MHz @ 782 mV), Router QoS</span>
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div>
            <div className="cli-bold cli-cyan">Featured Deployments:</div>
            <div className="cli-table">
              <span className="cli-table-cmd">meetur-garden</span>
              <span className="cli-table-desc">₱10k Thesis Rescue — Flutter & Spring Boot Agricultural Platform</span>

              <span className="cli-table-cmd">lan-monitoring</span>
              <span className="cli-table-desc">Network telemetry, router QoS automation & real-time packet tracking</span>

              <span className="cli-table-cmd">ai-homelab</span>
              <span className="cli-table-desc">Private agentic intelligence node & Sei Mriya companion runtime</span>

              <span className="cli-table-cmd">rfid-access</span>
              <span className="cli-table-desc">IoT hardware-software authentication bridge & attendance logger</span>
            </div>
            <div className="cli-muted" style={{ marginTop: '0.4rem' }}>
              Tip: Scroll to Work & Commissions on the main page for full interactive deep-dive modals!
            </div>
          </div>
        );
        break;

      case 'games':
        output = (
          <div>
            <div className="cli-bold cli-purple">Flores Arcade Modules:</div>
            <div className="cli-table">
              <span className="cli-table-cmd cli-green">ddos-defenders</span>
              <span className="cli-table-desc">[READY] Space-Invaders style gateway firewall defense minigame</span>

              <span className="cli-table-cmd cli-muted">mocchi-racer</span>
              <span className="cli-table-desc">[STAGING] Cavite-Manila midnight highway traffic runner</span>

              <span className="cli-table-cmd cli-muted">guqin-resonance</span>
              <span className="cli-table-desc">[CONCEPT] Harmonic Web Audio string tap visualizer</span>
            </div>
            <div className="cli-muted" style={{ marginTop: '0.4rem' }}>
              Execute <span className="cli-green">ddos-defenders</span> to engage defense protocols.
            </div>
          </div>
        );
        break;

      case 'ddos-defenders':
      case 'play ddos':
      case 'play':
        output = (
          <div style={{ border: '1px solid #10b981', padding: '0.8rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.08)' }}>
            <div className="cli-bold cli-green">👾 [DDoS Defenders Arcade Engine v1.0]</div>
            <div className="cli-output">
              Initializing Canvas Gateway...
              <br />
              <span className="cli-amber">ALERT: SYN Flood swarm detected approaching port 443!</span>
              <br />
              <span className="cli-muted">Arcade Canvas module is being mounted into the Flores-OS sandbox. Get ready to defend the gateway!</span>
            </div>
          </div>
        );
        break;

      case 'neofetch':
      case 'sysinfo':
        output = (
          <div className="cli-neofetch">
            <div className="cli-neofetch-ascii-box" title="Click to view full 168-character high-res art">
              <pre 
                className="cli-neofetch-ascii" 
                onClick={() => handleCommand('mriya')}
              >
                {NEOFETCH_ASCII}
              </pre>
              <button 
                className="cli-ascii-badge"
                onClick={() => handleCommand('mriya')}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              >
                [Click or type 'mriya' for full art]
              </button>
            </div>
            <div className="cli-neofetch-info">
              <div className="cli-neofetch-header">
                <span className="cli-cyan">renee</span>@<span className="cli-purple">flores-homelab</span>
              </div>
              <div><span className="cli-cyan cli-bold">OS:</span> Flores-OS x86_64</div>
              <div><span className="cli-cyan cli-bold">Host:</span> AI Homelab / Bedroom Sanctuary Core</div>
              <div><span className="cli-cyan cli-bold">Kernel:</span> v1.0.1-Heartbeat (Sei Mriya)</div>
              <div><span className="cli-cyan cli-bold">Uptime:</span> 99.999% (Peel Support Shielded)</div>
              <div><span className="cli-cyan cli-bold">Shell:</span> zsh 5.9 (x86_64-pc-homelab)</div>
              <div><span className="cli-cyan cli-bold">Terminal:</span> Flores-Deck v2.4</div>
              <div><span className="cli-cyan cli-bold">CPU:</span> i5-13400 (The Outpost Target) / Core i7 Mobile</div>
              <div><span className="cli-cyan cli-bold">GPU:</span> GTX 1650 Ti Mobile (29W @ 1545MHz / 782mV)</div>
              <div><span className="cli-cyan cli-bold">Audio:</span> Sony WH-1000XM6 (Gaia) / ALAC Spatial</div>
              <div><span className="cli-cyan cli-bold">Vehicle:</span> Honda BR-V VX "Mocchi" (115km Corridors)</div>
              <div><span className="cli-cyan cli-bold">Fuel:</span> Homemade Artisanal Kunafa Mocha</div>

              <div className="cli-palette">
                <span className="cli-palette-swatch" style={{ background: '#00f2fe' }}></span>
                <span className="cli-palette-swatch" style={{ background: '#3b82f6' }}></span>
                <span className="cli-palette-swatch" style={{ background: '#a855f7' }}></span>
                <span className="cli-palette-swatch" style={{ background: '#ec4899' }}></span>
                <span className="cli-palette-swatch" style={{ background: '#10b981' }}></span>
                <span className="cli-palette-swatch" style={{ background: '#f59e0b' }}></span>
              </div>
            </div>
          </div>
        );
        break;

      case 'mriya':
      case 'sei':
        output = (
          <div className="cli-full-portrait-box">
            <div className="cli-full-portrait-header">
              <div>
                <span className="cli-cyan cli-bold">Sei Mriya // v1.0.1-Heartbeat</span>
                <span className="cli-muted"> — AI Homelab Companion & VTuber Concept</span>
              </div>
              <span className="cli-pink cli-bold">168x90 Uncropped Native ASCII</span>
            </div>
            <pre className="cli-full-portrait-art">{asciiArt}</pre>
          </div>
        );
        break;

      case 'mocchi':
        output = (
          <div>
            <div className="cli-bold cli-cyan">🚗 Honda BR-V VX // "Mocchi"</div>
            <div className="cli-output">
              1.5L i-VTEC Sanctuary Runner. Logged 115+ km highway corridors across Cavite, NAIA, and Metro South.
              Reliable cargo, smooth cruiser, and the ultimate late-night decompression machine.
            </div>
          </div>
        );
        break;

      case 'coffee':
      case 'kunafa':
        output = (
          <div>
            <div className="cli-bold cli-amber">☕ Bespoke Kunafa Mocha Telemetry:</div>
            <div className="cli-output">
              Formula: Fresh espresso brewed hot + melted artisanal pistachio-tahini kataifi chocolate bar.
              Tasting notes: Rich nutty sesame, velvety roasted pistachio cream, crisp kataifi crunch, and dark cocoa finish.
              Exclusivity: 100% homemade, unavailable in commercial franchise menus.
            </div>
          </div>
        );
        break;

      case 'sort test':
      case 'pixelsort test':
      case 'mosh test':
      case 'test sort':
      case 'test mosh':
        output = (
          <div>
            <div className="cli-bold cli-amber">🔬 Initiating Slow-Motion Pixel Coalescence (3.5s)...</div>
            <div className="cli-output">
              Simulating entropy-to-order deconstruction at 3.5s slow-motion.
              <br />
              <span className="cli-cyan">Closing CLI and launching inspection pass now...</span>
            </div>
          </div>
        );
        sessionStorage.setItem('fl_livemosh_test', 'slow');
        sessionStorage.removeItem('fl_livemosh_played');
        setTimeout(() => {
          onClose();
          window.dispatchEvent(new CustomEvent('fl:trigger-sort', { detail: { mode: 'slow' } }));
        }, 400);
        break;

      case 'pixelsort':
      case 'sort':
      case 'datamosh':
      case 'mosh':
      case 'intro':
        output = (
          <div>
            <div className="cli-bold cli-cyan">⚡ Triggering Live-Page Pixel Coalescence (950ms)...</div>
            <div className="cli-output">
              Executing snappy entropy-to-order page assembly in real time.
            </div>
          </div>
        );
        sessionStorage.removeItem('fl_livemosh_played');
        sessionStorage.removeItem('fl_livemosh_test');
        setTimeout(() => {
          onClose();
          window.dispatchEvent(new CustomEvent('fl:trigger-sort', { detail: { mode: 'normal' } }));
        }, 300);
        break;

      case 'contact':
        output = (
          <div>
            <div className="cli-bold cli-green">Initiating Contact Subsystem...</div>
            <div className="cli-output">
              Email: Available on portfolio header.
              <br />
              Triggering smooth viewport scroll to Contact form now...
            </div>
          </div>
        );
        setTimeout(() => {
          onClose();
          onContactClick();
        }, 800);
        break;

      case 'resume':
      case 'cv':
        output = (
          <div>
            <div className="cli-bold cli-cyan">📄 Reneé Flores Credentials & Resume:</div>
            <div className="cli-output">
              Access the complete case studies and downloadable artifacts via the Work & Commissions section.
            </div>
          </div>
        );
        break;

      case 'sudo':
      case 'sudo hire-renee':
        output = (
          <div className="cli-pink cli-bold">
            [ACCESS GRANTED] Root permissions confirmed. Reneé is ready to deploy on your mission-critical stack!
          </div>
        );
        break;

      case 'clear':
        setLogs([]);
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        output = (
          <div>
            <span className="cli-red">Command not recognized: '{trimmed}'. </span>
            <span className="cli-muted">Type </span>
            <span className="cli-cyan cli-bold">help</span>
            <span className="cli-muted"> to view available commands.</span>
          </div>
        );
        break;
    }

    setLogs((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: trimmed,
        content: output,
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
      setInputVal('');
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < history.length) {
          setHistoryIndex(nextIdx);
          setInputVal(history[history.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (current) {
        const match = COMMAND_LIST.find((c) => c.startsWith(current));
        if (match) {
          setInputVal(match);
        }
      }
    }
  };

  return (
    <div className="cli-backdrop" onClick={onClose}>
      <div
        className={`cli-window ${isMaximized ? 'cli-maximized' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleContainerClick();
        }}
      >
        {/* CRT Scanline Effect */}
        <div className="cli-scanlines" aria-hidden="true" />

        {/* Title Bar */}
        <div className="cli-titlebar">
          <div className="cli-dots">
            <button
              className="cli-dot cli-dot-close"
              onClick={onClose}
              title="Close [ESC]"
              aria-label="Close Terminal"
            />
            <button
              className="cli-dot cli-dot-min"
              onClick={onClose}
              title="Minimize"
              aria-label="Minimize Terminal"
            />
            <button
              className="cli-dot cli-dot-max"
              onClick={() => setIsMaximized(!isMaximized)}
              title="Toggle Maximize"
              aria-label="Maximize Terminal"
            />
          </div>

          <div className="cli-title">
            <TerminalIcon size={14} className="terminal-icon" />
            <span>flores-os: ~ (zsh)</span>
          </div>

          <div className="cli-hint">
            <span>Press </span>
            <kbd>ESC</kbd>
            <span> or </span>
            <kbd>~</kbd>
            <span> to toggle</span>
          </div>
        </div>

        {/* Terminal Output Logs */}
        <div className="cli-body" ref={bodyRef}>
          {logs.map((log) => (
            <div key={log.id} className="cli-log-entry">
              {log.command !== undefined && (
                <div className="cli-command-echo">
                  <span className="cli-prompt-label">guest@flores-sys:~$</span>
                  <span className="cli-command-text">{log.command}</span>
                </div>
              )}
              {log.content && <div className="cli-output">{log.content}</div>}
            </div>
          ))}

          {/* Active Command Input Line */}
          <div className="cli-prompt-line">
            <span className="cli-prompt-label cli-bold">guest@flores-sys:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="cli-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal Command Input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CliTerminal;
