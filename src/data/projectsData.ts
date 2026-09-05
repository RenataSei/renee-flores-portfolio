export interface ProjectScreenshot {
  title: string;
  caption: string;
  tag: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'commission' | 'personal';
  type: string;
  ndaProtected?: boolean;
  featured: boolean;
  timeframe: string;
  role: string;
  summary: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  challenge: string;
  solution: string;
  impact: string;
  isoStandard?: string;
  architectureDetails: string[];
  architectureDiagram?: string;
  visualCheckpoints?: ProjectScreenshot[];
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'thesis-rescue',
    title: 'Emergency Thesis System Recovery: LAN Monitoring & Router Automation',
    subtitle: '14-Day Refactoring, Thread Concurrency & Selenium WebDriver Architecture',
    category: 'commission',
    type: 'Client Project • Emergency Refactoring',
    featured: true,
    timeframe: '14 Days to Defense',
    role: 'Lead Rescue Developer & Systems Engineer',
    summary: 'Took over an abandoned, failing Python-based router management and network monitoring thesis application with two weeks remaining before panel defense. Solved browser automation crashes, eliminated subprocess overhead, added thread synchronization, and implemented network scanning fallbacks.',
    metrics: [
      { label: 'Timeframe', value: '14 Days' },
      { label: 'Defense Outcome', value: 'Passed' },
      { label: 'Concurrency Model', value: 'threading.RLock' },
      { label: 'Core Stack', value: 'Python · Selenium' }
    ],
    tags: ['Python', 'Selenium WebDriver', 'Tkinter / ttkbootstrap', 'Nmap', 'Local ARP Parsing', 'Threading / RLock', 'Network Automation'],
    challenge: 'With two weeks left before final defense, the client student team was left with a broken desktop application. Subprocesses were spawning redundant browser sessions and crashing, lack of thread synchronization caused race conditions with the router’s loading masks (`global-trans-mask`), and the application froze completely whenever Nmap was missing on the host.',
    solution: 'Conducted a rapid code audit and executed a complete architectural refactor: unified independent menu scripts into native Tkinter `Toplevel` windows with shared controller state, implemented session reuse (`ensure_logged_in`) with re-entrant locks (`threading.RLock`), replaced brittle `time.sleep` timeouts with explicit `WebDriverWait` triggers on router masks, and built a graceful fallback parser for local ARP tables (`arp -a`).',
    impact: 'Stabilized the application into a reliable, single-window monitoring dashboard with live colorized logging. The client group successfully demonstrated real-time bandwidth tracking and MAC/domain blocking during defense, graduating on schedule.',
    architectureDetails: [
      'Engineered shared Selenium browser session persistence (`ensure_logged_in`), cutting repeated login overhead.',
      'Implemented re-entrant locks (`threading.RLock`) guarding browser automation from concurrent background thread collisions.',
      'Replaced brittle fixed timeouts with explicit `WebDriverWait` triggers synchronized to the router GUI loading mask (`global-trans-mask`).',
      'Built automated network scanner with primary Nmap discovery and zero-dependency system `arp -a` table fallback.',
      'Constructed thread-safe `TextRedirector` capturing `stdout` to display colorized priority logs (`[SUCCESS]`, `[ERROR]`, `[INFO]`).'
    ],
    architectureDiagram: `Tkinter Desktop Dashboard (main_menu.py)
     │
 ┌───┴────────────────────────────────────────┐
 ▼                                            ▼
Real-Time Bandwidth Monitor & QoS           Site Blocker & Profiler
(Live Speed Poller from Router Status)       (Parental Controls MAC/Domain Blacklists)
 │                                            │
 └─────────────────────┬──────────────────────┘
                       ▼
         Shared Selenium Controller
         (router_automation.py)
                       │
            [threading.RLock]  <-- Thread Safety
            [WebDriverWait]    <-- Eliminates UI Race Conditions
                       │
                       ▼
        TP-Link Router Web Interface (tplinkwifi.net)
        (Parental Controls, QoS, Bandwidth Tables)
                       ▲
                       │
        Subnet Network Discovery Layer
        (Nmap Subnet Scanner  ➔  Fallback: System \`arp -a\` Table)`,
    visualCheckpoints: [
      {
        title: 'Unified Main Menu Dashboard',
        caption: 'Refactored Tkinter dashboard sharing a single persistent Selenium controller and live connection sentinel.',
        tag: 'UI & Architecture'
      },
      {
        title: 'Real-Time Bandwidth Monitor',
        caption: 'Multi-column grid polling live downstream/upstream speeds directly from the router client tables.',
        tag: 'Network Scraping'
      },
      {
        title: 'Router Profile & Site Blocker',
        caption: 'Parental Controls manager traversing multi-page client checkboxes to toggle device and domain rules.',
        tag: 'Automation'
      },
      {
        title: 'Integrated Live System Logs',
        caption: 'Real-time text redirector capturing stdout with colorized severity tags ([SUCCESS], [ERROR], [INFO]).',
        tag: 'Telemetry'
      }
    ]
  },
  {
    id: 'meet-ur-garden',
    title: 'Meet-Ur Garden: Smart Botanical Care Web Application',
    subtitle: 'Climate-Tracking & Curated Database for Dhoie’s Garden (DLSU-D Thesis)',
    category: 'commission',
    type: 'Bachelor\'s Thesis • Full-Stack Web Application',
    featured: true,
    timeframe: 'Thesis Defense',
    role: 'Lead Full-Stack Developer & Researcher',
    summary: 'A web-based botanical care application specializing in weather and climate tracking using open-source APIs and a curated database for Dhoie’s Garden. Evaluated under the ISO/IEC 25010:2011 software product quality framework.',
    metrics: [
      { label: 'Evaluation Model', value: 'ISO/IEC 25010' },
      { label: 'Curated Catalog', value: '120+ Species' },
      { label: 'Climate Telemetry', value: 'OpenWeather API' },
      { label: 'Hardware Scanning', value: 'Web NFC (NDEF)' }
    ],
    tags: ['React 18', 'Node.js', 'Express.js 5', 'MongoDB / Mongoose 8', 'OpenWeatherMap API', 'Speakeasy (TOTP 2FA)', 'Web NFC', 'React-Leaflet'],
    isoStandard: 'Evaluated against ISO/IEC 25010:2011 quality characteristics (Functional Suitability, Reliability, Usability, Performance Efficiency) by the DLSU-D Academic Defense Panel.',
    challenge: 'Traditional plant care applications rely on rigid, calendar-based watering alarms that fail to account for specific botanical water tolerance, ambient humidity, temperature extremes, and seasonal dormancy, leading to plant mortality in local commercial gardens.',
    solution: 'Designed and built an end-to-end full-stack application featuring `careEngine.js`—a dynamic watering and health calculation engine driven by real-time OpenWeatherMap data, species-specific ecological descriptors, pot material modifiers (Terra Cotta 0.8x evaporation), winter dormancy factors (1.3x), and Web NFC pot scanning.',
    impact: 'Successfully defended at DLSU-D (BIT45) under rigorous ISO/IEC 25010 evaluation, delivering a functional tool tested with 120+ plant profiles tailored specifically for Dhoie’s Garden.',
    architectureDetails: [
      'Engineered `careEngine.js` dynamic evaporation algorithm: calculates watering intervals from base frequencies, Terra Cotta porosity (0.8x), winter dormancy (1.3x), and weather overrides (rain delay +2d, heat bake 0.7x).',
      'Integrated OpenWeatherMap API for live temperature, humidity, and 5-day forecast scanning (detecting upcoming rain and heatwaves).',
      'Implemented Web NFC (`NDEFReader` API) to bind physical NFC tags on nursery pots directly to digital plant health profiles.',
      'Secured user accounts with RFC 6238 TOTP two-factor authentication (`speakeasy` + `qrcode` with 30s window validation), `bcrypt`, and signed JWTs.',
      'Built interactive garden layout mapping using `React-Leaflet` to plot plant locations within physical garden zones.'
    ],
    architectureDiagram: `React 18 Single-Page Application
(React-Leaflet Map · Web NFC Scanner · Garden Dashboard)
     │
     ▼  REST API (JWT Bearer Token + TOTP 2FA Gate)
Express.js 5 Backend & Security Layer
     │
 ┌───┴────────────────────────────────────────┐
 ▼                                            ▼
Auth & Security Middleware            careEngine.js Calculation Core
(JWT, Speakeasy TOTP 2FA,             (OpenWeatherMap Telemetry,
 express-rate-limit, bcrypt)          Dynamic Watering Interval Math:
 │                                    Terra Cotta 0.8x, Winter 1.3x,
 │                                    Rain Delay +2d, Heat Bake 0.7x)
 └─────────────────────┬──────────────────────┘
                       ▼
           MongoDB / Mongoose 8 Store
   (120+ Curated Botanical Profiles for Dhoie’s Garden,
    Timestamped Watering Logs, Dynamic Soil Thresholds)`,
    visualCheckpoints: [
      {
        title: 'Garden Plot & Health Overview',
        caption: 'Interactive dashboard rendering dynamic hydration percentages and urgent action notices based on live weather.',
        tag: 'Dashboard'
      },
      {
        title: 'Curated Botanical Database',
        caption: 'Detailed plant profiles containing ecological descriptors, temperature tolerances, and propagation notes.',
        tag: 'Database'
      },
      {
        title: 'careEngine.js Evaporation Math',
        caption: 'Dynamic calculations modifying care intervals by pot material, season, and real-time precipitation.',
        tag: 'Logic Engine'
      },
      {
        title: 'Web NFC Hardware Tap',
        caption: 'Direct pot identification using the Web NFC NDEFReader API to bring up plant care logs instantly.',
        tag: 'Hardware Integration'
      }
    ]
  },
  {
    id: 'ekaha-app',
    title: 'Payment & Business Transaction Platform',
    subtitle: 'Secure Transaction Processing & 2FA Architecture (Confidential Client)',
    category: 'commission',
    type: 'Client Project • Full-Stack / Security',
    ndaProtected: true,
    featured: true,
    timeframe: 'Contract Deployment',
    role: 'Backend & Security Developer',
    summary: 'Engineered payment workflows, TOTP multi-factor authentication, and transactional audit trails for a business platform. Proprietary client branding and interfaces are masked under strict confidentiality protocols.',
    metrics: [
      { label: 'Identity Security', value: 'TOTP 2FA' },
      { label: 'Session Handling', value: 'JWT & bcrypt' },
      { label: 'Transaction Logs', value: 'Audit Trail' },
      { label: 'IP Status', value: 'NDA Masked' }
    ],
    tags: ['Node.js', 'Express.js', 'TOTP 2FA', 'bcrypt', 'JWT', 'Audit Trails', 'REST Security'],
    challenge: 'The client application required dependable transaction processing integration and multi-factor authentication to protect user accounts against session hijacking and unauthorized state changes.',
    solution: 'Designed an isolated authentication module featuring time-based one-time password (TOTP) 2FA verification, salted bcrypt password hashing, and signed JWT session management. Implemented transaction audit logging designed to preserve an append-oriented history of security-sensitive operations.',
    impact: 'Delivered robust authentication and checkout verification flows with complete traceability while preserving a frictionless checkout flow.',
    architectureDetails: [
      'Engineered HMAC validation routines for incoming payment callbacks and webhook notifications.',
      'Built time-sensitive TOTP 2FA token lifecycles with expiration and nonce tracking.',
      'Implemented transaction audit logging designed to preserve an append-oriented history of security-sensitive operations.',
      'Masked proprietary client interfaces in strict compliance with non-disclosure agreements.'
    ],
    architectureDiagram: `Client Application (Web / Checkout)
     │
     ▼
API Security Layer (HTTPS & CORS Policy)
     │
 ┌───┴───────────────────────────────┐
 ▼                                   ▼
TOTP 2FA Verification Engine        Payment Webhook Handlers
 │                                   │
 ▼                                   ▼
bcrypt Salted Hashes & JWT          SHA-256 HMAC Signature Verification
 │                                   │
 └─────────────────┬─────────────────┘
                   ▼
       Append-Oriented Audit Trail
       (Tamper-Resistant Activity Logging)`,
    visualCheckpoints: [
      {
        title: 'TOTP 2FA Enrollment Flow',
        caption: 'QR code provisioning and RFC 6238 time-step verification cycle with client branding masked.',
        tag: 'Authentication'
      },
      {
        title: 'Webhook Verification Pipeline',
        caption: 'HMAC signature calculation and timestamp validation guarding incoming payment gateway callbacks.',
        tag: 'Security'
      },
      {
        title: 'Structured Audit Log Viewer',
        caption: 'Administrative activity trail recording actor IDs, IP hashes, timestamps, and state transitions.',
        tag: 'Audit Trail'
      }
    ]
  },
  {
    id: 'mobile-utility-flutter',
    title: 'Cross-Platform Utilities (Dart & Flutter)',
    subtitle: 'Reactive Mobile UI with Offline-First Local Storage',
    category: 'personal',
    type: 'Mobile Engineering',
    featured: false,
    timeframe: 'Active Project',
    role: 'Mobile Software Engineer',
    summary: 'Cross-platform mobile utility applications built with Dart and Flutter. Built a responsive offline-first mobile architecture with fast local startup, reactive state updates, and continued utility during connectivity loss.',
    metrics: [
      { label: 'Platform Support', value: 'Android & iOS' },
      { label: 'Local Persistence', value: 'SQLite Cache' },
      { label: 'State Management', value: 'Provider / BLoC' },
      { label: 'Design System', value: 'Material 3' }
    ],
    tags: ['Dart', 'Flutter', 'SQLite', 'Reactive UI', 'Mobile Architecture', 'Material 3'],
    challenge: 'Delivering smooth mobile tools that preserve full offline utility without state desynchronization when intermittent mobile data connectivity drops.',
    solution: 'Designed an offline-first architectural pattern with reactive SQLite caching, background isolate workers for data transformation, and adaptive UI layouts built for modern mobile form factors.',
    impact: 'Achieved fast local startup, reactive state updates, and uninterrupted usability without active network connections.',
    architectureDetails: [
      'Separated presentation, business logic, and local data persistence into distinct layers.',
      'Utilized Dart isolates for background JSON serialization and data calculations.',
      'Integrated Material 3 design tokens with responsive viewport adaptations.'
    ]
  },
  {
    id: 'agentic-ai-homelab',
    title: 'Local Homelab & Agentic Workflow Systems',
    subtitle: 'Context-Grounded Tool Orchestration & Hardware Telemetry',
    category: 'personal',
    type: 'Systems & AI Automation',
    featured: false,
    timeframe: 'Ongoing Development',
    role: 'AI Systems Architect & Homelab Engineer',
    summary: 'A structured local development environment utilizing multi-agent AI tooling, persistent JSONL memory logs, and hardware-aware power profiling to support efficient local development sprints.',
    metrics: [
      { label: 'Context Engine', value: 'Structured JSONL' },
      { label: 'Tool Hooks', value: 'Agent Dispatch' },
      { label: 'Power Profile', value: 'Low-Wattage Tuned' },
      { label: 'Environment', value: 'Local Homelab' }
    ],
    tags: ['Python Automation', 'Agentic AI', 'Structured JSONL', 'Hardware Telemetry', 'CLI Tooling'],
    challenge: 'Standard AI coding assistants lack continuous local project context and hardware awareness, causing repetitive setup prompts and heavy resource draw on mobile workstation hardware.',
    solution: 'Designed a persistent-context development workflow featuring structured episodic and semantic memory dumps (`Memory.md`), hardware-aware task throttling, and autonomous tool dispatching.',
    impact: 'Streamlined local software engineering sprints, documentation reviews, and job preparation workflows.',
    architectureDetails: [
      'Implemented structured markdown memory pipelines with automated chronological indexing.',
      'Configured task dispatching and validation checklists across multi-file codebases.',
      'Maintained low-overhead background tooling tailored for power-efficient developer laptops.'
    ]
  },
  {
    id: 'hardware-bios-diagnostics',
    title: 'Workstation Tuning & Hardware Diagnostics',
    subtitle: 'Thermal Interfaces, Memory Subsystems & System Diagnostics',
    category: 'commission',
    type: 'Systems Diagnostics & Service',
    featured: false,
    timeframe: 'Freelance Service',
    role: 'Hardware Diagnostics Specialist',
    summary: 'Hands-on workstation maintenance: custom PC builds, phase-change thermal pad (PTM7950) repasting, DRAM memory timing stabilization, and driver recovery.',
    metrics: [
      { label: 'Thermal Interface', value: 'PTM7950 / Pads' },
      { label: 'Memory Stability', value: 'XMP Tested' },
      { label: 'Diagnostics', value: 'Driver / BIOS' },
      { label: 'Service Scope', value: 'PC Maintenance' }
    ],
    tags: ['BIOS Tuning', 'Hardware Diagnostics', 'PTM7950', 'XMP Stabilization', 'System Recovery'],
    challenge: 'Systems suffering from driver corruption, thermal throttling during heavy render jobs, and memory instability under sustained workloads.',
    solution: 'Analyzed and tuned system power, thermal, and memory parameters for sustained workloads. Stabilized DRAM memory timings under memtest workloads, and configured custom fan curves.',
    impact: 'Stabilized DRAM timings under memory stress testing and replaced degraded thermal interfaces with phase-change materials for lower temperatures and prolonged hardware longevity.',
    architectureDetails: [
      'Profiled core frequencies and voltage curves for optimal efficiency.',
      'Stress-tested DRAM memory sub-timings against high-concurrency memory benchmarks.',
      'Replaced degraded thermal compounds with phase-change thermal interfaces.'
    ]
  }
];

export const SKILLS_CATEGORIES = [
  {
    category: 'Full-Stack Web Development',
    skills: [
      { name: 'React 18', note: 'Hooks, Component Lifecycle, React-Leaflet Maps' },
      { name: 'Node.js & Express 5', note: 'REST APIs, Middleware, careEngine.js Logic' },
      { name: 'C# & ASP.NET Core', note: 'MVC Architecture, Razor Views, Web APIs' },
      { name: 'RESTful API Architecture', note: 'OpenWeatherMap Telemetry, Web NFC Integration' },
      { name: 'HTML5 & Modern CSS', note: 'Semantic Layouts, Glassmorphism, Responsive Design' }
    ]
  },
  {
    category: 'Databases & Concurrency',
    skills: [
      { name: 'MongoDB & Mongoose 8', note: 'Document Modeling, Botanical Catalogs, Indexes' },
      { name: 'Python Concurrency', note: 'threading.RLock, Explicit WebDriverWait, Subprocess Elimination' },
      { name: 'SQL & Relational Schemas', note: 'Normalized Tables, Foreign Keys, Query Logic' },
      { name: 'Local Data Caching', note: 'Offline-First SQLite, In-Memory Session Reuse' }
    ]
  },
  {
    category: 'Security & Quality Standards',
    skills: [
      { name: 'ISO/IEC 25010 Criteria', note: 'Evaluated as Official DLSU-D Thesis Quality Framework' },
      { name: 'TOTP 2FA Verification', note: 'Speakeasy (RFC 6238), QR Provisioning, 30s Window' },
      { name: 'JWT & Session Integrity', note: 'Signed Tokens, Route Guards, Expiration Validation' },
      { name: 'bcrypt & HMAC Security', note: 'Salted Password Hashing, Webhook Signature Verification' },
      { name: 'express-rate-limit', note: 'API Brute-Force & Denial-of-Service Throttling' }
    ]
  },
  {
    category: 'Systems, Automation & Tools',
    skills: [
      { name: 'Selenium WebDriver & Automation', note: 'Browser Automation, Dynamic Trans-Mask Synchronization' },
      { name: 'Network Scanning (Nmap & ARP)', note: 'Subnet Discovery with Native System arp -a Fallback' },
      { name: 'Dart & Flutter', note: 'Cross-Platform Mobile Apps, Material 3, Clean Architecture' },
      { name: 'Python Scripting', note: 'Desktop GUI (Tkinter/ttkbootstrap), stdout Redirection' },
      { name: 'Git & Version Control', note: 'Repository Management, Selective .gitignore Hardening' }
    ]
  }
];

export const PROFILE_DATA = {
  name: 'Reneé Bernard Flores',
  headline: 'Full-Stack Developer & Software Engineer',
  location: 'Cavite / Manila, Philippines (Open to Remote Worldwide & Dubai Relocation)',
  bio: 'De La Salle University - Dasmariñas (BIT45) graduate. I build full-stack web applications, network automation tools, and backend services using React, Node.js, C#, and Python, focusing on reliability, practical problem-solving, and clean software architecture.',
  availability: 'Actively Interviewing • Ready for Remote & Onsite (Dubai / Manila)',
  stats: [
    { label: 'DLSU-D Thesis', value: 'Meet-Ur Garden (Passed)' },
    { label: 'Client Rescue', value: '14-Day LAN System' },
    { label: 'English Fluency', value: '980 TOEIC' },
    { label: 'Primary Stacks', value: 'React · Node · Python' }
  ],
  socials: {
    linkedin: 'https://www.linkedin.com/in/reneé-bernard-flores-55661924a',
    github: 'https://github.com',
    email: 'renee.flores.dev@gmail.com'
  }
};
