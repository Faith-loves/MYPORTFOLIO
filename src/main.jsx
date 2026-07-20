import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const routes = [
  ['/', 'Home'],
  ['/work', 'Work'],
  ['/about', 'About'],
  ['/security', 'Security'],
  ['/contact', 'Contact']
]

const profileLinks = [
  ['GitHub', 'https://github.com/Faith-loves'],
  ['LinkedIn', 'https://www.linkedin.com/in/temiloluwa-faith-kareem-a526b7420'],
  ['Email', 'mailto:omolarak724@gmail.com']
]

const liveBuilds = [
  {
    slug: 'deceivra',
    name: 'Deceivra',
    type: 'Context-Aware Scam Detection Platform',
    category: 'Cybersecurity + Frontend',
    filters: ['Security', 'Frontend', 'AI', 'UX'],
    color: 'cyan',
    url: 'https://deceivra.vercel.app/',
    note: 'A context-aware scam detection platform that analyzes suspicious conversations, explains social-engineering tactics, and gives users practical safety actions before they respond.'
  },
  {
    slug: 'blockchain-voting',
    name: 'Blockchain Voting',
    type: 'Full Stack + Security',
    category: 'Full Stack',
    filters: ['Full Stack', 'Security'],
    color: 'cyan',
    url: 'https://blockchain-voting-5ob8.vercel.app/',
    note: 'Secure voting flow with verification, ballot review, and deployment-ready product structure.'
  },
  {
    slug: 'ai-smart-ui',
    name: 'AI Smart UI',
    type: 'AI Interface',
    category: 'AI + Frontend',
    filters: ['AI', 'Frontend'],
    color: 'indigo',
    url: 'https://ai-smart-ui.vercel.app/',
    note: 'Prompt-first AI workspace with generated interface output and responsive UI thinking.'
  },
  {
    slug: 'sentinelx',
    name: 'SentinelX',
    type: 'Cybersecurity Dashboard',
    category: 'Cybersecurity',
    filters: ['Security', 'Frontend'],
    color: 'terminal',
    url: 'https://sentinelx-pi.vercel.app/',
    note: 'Security operations frontend for monitoring alerts, risk signals, and analyst-style visibility.'
  },
  {
    slug: 'nevermind-store',
    name: 'Nevermind Store',
    type: 'Ecommerce Frontend',
    category: 'Ecommerce',
    filters: ['Frontend', 'Ecommerce'],
    color: 'gold',
    url: 'https://nevermind-store-sigma.vercel.app/',
    note: 'A customer-facing store experience with product browsing and polished shopping presentation.'
  },
  {
    slug: 'taskflow-pro',
    name: 'TaskFlow Pro',
    type: 'Productivity App',
    category: 'Productivity',
    filters: ['Frontend', 'Productivity'],
    color: 'indigo',
    url: 'https://taskflow-pro-8.vercel.app/',
    note: 'Task planning interface with workflow states, dashboard rhythm, and productivity polish.'
  },
  {
    slug: 'intern-track',
    name: 'Intern Track',
    type: 'Internship Tracking Platform',
    category: 'Dashboard',
    filters: ['Frontend', 'Dashboard', 'Productivity'],
    color: 'emerald',
    url: 'https://intern-track-sable.vercel.app/',
    note: 'A clean internship tracking platform for organizing applications, progress states, deadlines, and career-search workflow.'
  },
  {
    slug: 'cipherpass',
    name: 'CipherPass',
    type: 'Security Product',
    category: 'Security',
    filters: ['Security', 'Full Stack'],
    color: 'terminal',
    url: 'https://cipher-pass-beta.vercel.app/',
    note: 'A focused password and access-management interface built around vault clarity, account protection, and secure product trust.'
  },
  {
    slug: 'devdocs-ai',
    name: 'DevDocs AI',
    type: 'AI Developer Tool',
    category: 'AI + Developer Tools',
    filters: ['AI', 'Frontend'],
    color: 'indigo',
    url: 'https://dev-docs-ai-lac.vercel.app/',
    note: 'An AI documentation assistant for searching technical docs, simplifying developer questions, and turning scattered references into usable answers.'
  }
]

const selectedLiveBuilds = liveBuilds.filter((build) => build.url).slice(0, 4)

const caseStudyDetails = {
  'blockchain-voting': {
    role: 'Full-stack security builder',
    problem: 'Voting products have to communicate trust immediately. The main challenge was making voter verification, ballot casting, and audit review feel understandable without flattening the seriousness of the workflow.',
    approach: 'I structured the experience around a clear sequence: verify eligibility, review the ballot, cast the vote, and leave the user with a confidence signal. The interface favors readable states, strong confirmations, and a deployment-ready product rhythm.',
    outcome: 'The result is a live voting flow that presents a security-heavy idea in a way normal users can follow, while still showing the technical care behind verification and auditability.',
    cards: [
      ['Trust Model', 'The case study frames the product around eligibility checks, ballot review, and post-submit confidence. Each step is written to reduce uncertainty and make the vote feel traceable.'],
      ['Interface Flow', 'The layout avoids unnecessary decoration and keeps the main action visible. Supporting copy explains what is happening before the user commits to a sensitive action.'],
      ['Security Thinking', 'The project demonstrates how I think about secure flows: clear user state, careful confirmation, and a product story that treats trust as part of the interface.']
    ],
    process: [
      ['Understand', 'Mapped the voting journey around the moments where users need the most confidence: identity, ballot choice, submission, and confirmation.'],
      ['Structure', 'Separated the flow into readable stages so the product does not feel like one crowded technical screen.'],
      ['Design', 'Used strong hierarchy, quiet surfaces, and clear action placement to support a serious civic product.'],
      ['Build', 'Implemented the frontend flow with responsive sections and deployment-friendly structure.'],
      ['Deploy', 'Published the project so the case study can point to a real, reviewable product instead of only a concept.']
    ],
    results: ['Live voting experience', 'Clear verification story', 'Audit-aware product flow']
  },
  'ai-smart-ui': {
    role: 'AI interface designer and frontend builder',
    problem: 'AI tools can become vague quickly when the input, generated output, and user control all compete for attention. This project needed a workspace that made prompting feel direct and the response area easy to read.',
    approach: 'I treated the product as a practical AI workbench: prompt area first, generated result second, and supporting interface details kept quiet. The goal was to make the user feel oriented from the first screen.',
    outcome: 'AI Smart UI presents a clean prompt-first experience with enough polish to feel like a real product direction, not a loose demo.',
    cards: [
      ['Prompt Experience', 'The interface makes the prompt feel like the primary object. It supports fast entry, review, and iteration without crowding the workspace.'],
      ['Output Clarity', 'Generated content is presented with readable hierarchy so the result feels useful immediately instead of buried inside decorative UI.'],
      ['Product Polish', 'Motion, spacing, and responsive structure are used to make the concept feel finished while keeping the experience lightweight.']
    ],
    process: [
      ['Understand', 'Identified the main user need: ask a question, receive output, and keep enough context to continue working.'],
      ['Structure', 'Built the screen around a prompt-to-output rhythm rather than a generic dashboard.'],
      ['Design', 'Kept visual noise low so the generated content stays central.'],
      ['Build', 'Implemented a responsive React interface with a polished product feel.'],
      ['Deploy', 'Shipped the live demo for portfolio review and iteration.']
    ],
    results: ['Prompt-first workflow', 'Readable AI output', 'Responsive live product']
  },
  sentinelx: {
    role: 'Cybersecurity frontend builder',
    problem: 'Security dashboards often overload the user with charts and alerts. SentinelX needed to feel like an analyst workspace where risk, priority, and next action are easy to scan.',
    approach: 'I shaped the interface around alert visibility, risk signals, and operational rhythm. The product language is intentionally direct, with a darker security tone and compact information surfaces.',
    outcome: 'The case study shows a live cybersecurity frontend that communicates monitoring, alert review, and analyst visibility with a strong security identity.',
    cards: [
      ['Risk Visibility', 'The dashboard is written around what an analyst needs to know first: what happened, how serious it is, and where attention should go next.'],
      ['Dashboard Rhythm', 'Sections are organized to scan quickly instead of behaving like disconnected cards. This supports repeated operational use.'],
      ['Security Tone', 'The visual language is restrained and technical, giving the project credibility without making the interface hard to read.']
    ],
    process: [
      ['Understand', 'Defined the dashboard around alert monitoring and fast risk recognition.'],
      ['Structure', 'Grouped information into analyst-friendly surfaces instead of generic metrics.'],
      ['Design', 'Used contrast, spacing, and compact labels to support a security operations feel.'],
      ['Build', 'Created the frontend experience and prepared it for a live deployment.'],
      ['Deploy', 'Published the project for direct review.']
    ],
    results: ['Security dashboard live', 'Analyst-style scan pattern', 'Clear incident visibility']
  },
  'nevermind-store': {
    role: 'Ecommerce frontend builder',
    problem: 'The store needed to feel polished enough for shopping while keeping product discovery straightforward. The challenge was balancing presentation with a practical buying journey.',
    approach: 'I focused on product browsing, visual hierarchy, and shopping flow clarity. The experience is built to help visitors inspect products, understand the brand mood, and move through the interface without confusion.',
    outcome: 'Nevermind Store now sits in the portfolio as a live ecommerce frontend that shows product presentation, layout polish, and customer-facing interaction design.',
    cards: [
      ['Product Browsing', 'The case study highlights how the store organizes product attention, helping visitors compare items without a heavy interface.'],
      ['Shopping Flow', 'The product experience is built around familiar ecommerce expectations: browse, inspect, choose, and continue.'],
      ['Brand Feel', 'The visual direction gives the store personality while keeping the core shopping path readable.']
    ],
    process: [
      ['Understand', 'Studied the basic customer journey from product discovery to shopping intent.'],
      ['Structure', 'Organized surfaces around browsing and product clarity.'],
      ['Design', 'Balanced brand styling with familiar ecommerce patterns.'],
      ['Build', 'Implemented the frontend with responsive product sections.'],
      ['Deploy', 'Published the live storefront for portfolio review.']
    ],
    results: ['Live ecommerce frontend', 'Product-first browsing', 'Responsive store layout']
  },
  'taskflow-pro': {
    role: 'Productivity frontend builder',
    problem: 'Task tools can become noisy when statuses, priorities, and daily planning all sit on the same screen. TaskFlow Pro needed a cleaner workflow that makes progress easy to understand.',
    approach: 'I built the case around task states, dashboard rhythm, and a practical planning interface. The UI supports repeated daily use through simple grouping and clear status language.',
    outcome: 'The project demonstrates productivity UI thinking: visible workflow states, readable planning surfaces, and a live deployed interface.',
    cards: [
      ['Workflow States', 'The product story focuses on how work moves from planned to active to complete, making progress easier to understand.'],
      ['Planning Clarity', 'The interface favors direct labels and clear grouping so the user can make decisions quickly.'],
      ['Daily Use', 'Spacing, hierarchy, and interaction rhythm are designed for a tool someone could return to often.']
    ],
    process: [
      ['Understand', 'Defined the core planning loop around today, in-progress work, and completion.'],
      ['Structure', 'Grouped tasks by state so the workflow is visible without explanation.'],
      ['Design', 'Kept the interface polished but practical for repeated use.'],
      ['Build', 'Implemented the responsive productivity frontend.'],
      ['Deploy', 'Published the live project and connected it to the portfolio.']
    ],
    results: ['Live productivity app', 'Clear workflow states', 'Dashboard-style planning']
  },
  'intern-track': {
    role: 'Dashboard frontend builder',
    problem: 'Internship applications involve deadlines, statuses, interviews, and follow-ups. The challenge was turning a stressful search process into a calmer tracking dashboard.',
    approach: 'I centered the project on application organization, progress states, and deadline awareness. The interface is designed to help users know what is pending, what needs attention, and what has moved forward.',
    outcome: 'Intern Track becomes a strong dashboard case study because it solves a real workflow with clear categories, focused sections, and a live deployed product.',
    cards: [
      ['Application System', 'The case study explains how applications can be tracked by stage so users do not lose context across many opportunities.'],
      ['Deadline Awareness', 'The product story emphasizes timing, follow-ups, and interview readiness as part of the dashboard value.'],
      ['Career Workflow', 'The interface supports a real job-search process instead of presenting disconnected productivity cards.']
    ],
    process: [
      ['Understand', 'Mapped the internship search around applications, deadlines, interviews, and follow-ups.'],
      ['Structure', 'Created a dashboard rhythm that makes each stage easy to review.'],
      ['Design', 'Used calm visual hierarchy to reduce the stress of tracking many opportunities.'],
      ['Build', 'Implemented the frontend and responsive sections for live use.'],
      ['Deploy', 'Published the project as a working case-study build.']
    ],
    results: ['Live tracking dashboard', 'Application-stage clarity', 'Career workflow focus']
  },
  cipherpass: {
    role: 'Security product builder',
    problem: 'Password tools must feel trustworthy without overwhelming users with security language. CipherPass needed a case study that explains vault clarity, safe access, and account protection in practical terms.',
    approach: 'I positioned the product around secure access management: a clear vault experience, careful sign-in expectations, and a product tone that makes sensitive information feel handled with care.',
    outcome: 'CipherPass is now linked as a live security project and presented with a detailed case study instead of a coming-soon placeholder.',
    cards: [
      ['Vault Clarity', 'The case study focuses on making stored credentials easy to review while keeping the interface serious and controlled.'],
      ['Trust Signals', 'Copy and layout emphasize protection, account access, and secure product expectations without turning the page into a technical essay.'],
      ['Live Delivery', 'The project moves from placeholder status to a real deployed product that visitors can open and inspect.']
    ],
    process: [
      ['Understand', 'Defined the sensitive parts of the experience: access, storage, review, and user confidence.'],
      ['Structure', 'Organized the case study around trust, vault usability, and product readiness.'],
      ['Design', 'Kept the visual system controlled so the product feels focused and security-aware.'],
      ['Build', 'Connected the live deployment and removed the old coming-soon state.'],
      ['Deploy', 'Linked the finished Vercel project directly from the portfolio.']
    ],
    results: ['Live CipherPass link', 'Security-focused case study', 'Trust-centered product story']
  },
  'devdocs-ai': {
    role: 'AI developer-tool builder',
    problem: 'Developers often lose time moving between documentation pages, examples, and unclear explanations. DevDocs AI needed to show how AI can make documentation search faster and more usable.',
    approach: 'I framed the tool around developer questions: search, summarize, clarify, and return practical answers. The case study explains the value in terms of reduced context switching and better technical understanding.',
    outcome: 'DevDocs AI is now connected to its live deployment with a fuller case study that shows the product purpose and developer workflow.',
    cards: [
      ['Developer Search', 'The product is presented as a focused assistant for finding and understanding docs, not as a generic chatbot.'],
      ['Answer Quality', 'The case study emphasizes useful technical explanations, direct summaries, and clearer next steps for developers.'],
      ['Workflow Fit', 'The interface story is built around reducing documentation friction during real development work.']
    ],
    process: [
      ['Understand', 'Identified the documentation pain point: scattered references and slow answer-finding.'],
      ['Structure', 'Defined the workflow around asking, searching, clarifying, and applying an answer.'],
      ['Design', 'Kept the UI developer-focused with clean hierarchy and enough space for technical text.'],
      ['Build', 'Connected the live deployment and replaced the placeholder state.'],
      ['Deploy', 'Added the Vercel project link so visitors can test it directly.']
    ],
    results: ['Live DevDocs AI link', 'Developer-tool case study', 'AI documentation workflow']
  },
  deceivra: {
    role: 'UI/UX designer and frontend developer',
    problem: 'Online scams are no longer obvious. Attackers impersonate trusted brands, create urgency, request credentials, hide suspicious links, and use emotional pressure across WhatsApp, SMS, email, job offers, and social media. Most tools stop at a vague safe-or-dangerous label, leaving everyday users unsure about what exactly is risky or what to do next.',
    approach: 'I designed Deceivra around explainable security: choose the conversation source, paste the suspicious message, run an analysis, review an overall threat score, inspect each detected signal, and follow practical recommendations. The interface translates cybersecurity indicators into clear evidence, confidence scores, severity labels, and recommended next steps, while staying responsive across desktop and mobile.',
    outcome: 'Deceivra ships as a live context-aware scam detection platform with multi-channel conversation analysis, explainable threat breakdowns, overall risk scoring, downloadable reports, history, and a polished responsive product experience that connects cybersecurity thinking with everyday usability.',
    images: [
      ['/deceivra-home.png', 'Home screen', "Hero and conversation-start flow showing Deceivra's trust-first positioning across desktop and mobile."],
      ['/deceivra-analyzer.png', 'Analyzer screen', 'Conversation analyzer with platform selection, privacy guidance, and message input designed for low-friction threat checks.'],
      ['/deceivra-results.png', 'Results screen', 'Security report with overall threat score, risk contribution, evidence, confidence, and recommended actions.'],
      ['/deceivra-about.png', 'About screen', 'About page explaining the mission, design principles, and product trust story.']
    ],
    cards: [
      ['Explainable Detection', 'Instead of returning a generic warning, Deceivra explains why a message is risky. Each threat includes supporting evidence, severity, confidence, and contribution to the final risk score.'],
      ['Trust-Centered UX', 'The product language avoids unnecessary jargon and guides users through a calm sequence: source, message, analysis, evidence, and action. This makes security feel understandable rather than intimidating.'],
      ['Responsive Product System', 'The experience was designed for desktop and mobile from the start, including navigation, analyzer forms, results cards, report actions, and readable information hierarchy on smaller screens.']
    ],
    process: [
      ['Research', 'Explored phishing and scam patterns including trusted-brand impersonation, time pressure, suspicious domains, credential requests, financial manipulation, and social-engineering tactics.'],
      ['Define', 'Framed the goal around helping users analyze suspicious conversations, understand the reason for risk, and act before sending money or revealing personal information.'],
      ['Design', 'Built a dark cybersecurity visual system with clear hierarchy, confidence signals, severity badges, proof panels, and interaction states for desktop and mobile.'],
      ['Build', 'Implemented the responsive frontend with Next.js, TypeScript, Tailwind CSS, React, motion, and deploy-ready component structure.'],
      ['Ship', 'Published the platform on Vercel with live analyzer, results, history, report export, and a case-study-ready product narrative.']
    ],
    results: ['Explainable scam detection', 'Multi-platform analysis', 'Responsive cybersecurity UI', 'Actionable safety guidance']
  }
}

const getCaseStudy = (project) => caseStudyDetails[project.slug] || {
  role: 'Frontend builder',
  problem: project.note,
  approach: 'I focused on a clean user flow, responsive layout, readable sections, and a presentation strong enough for a portfolio case study.',
  outcome: `${project.name} is presented as a focused portfolio project with clear purpose, implementation story, and delivery notes.`,
  cards: [
    ['Challenge', `Make ${project.name} feel clear, useful, and ready for real users.`],
    ['Interface', 'Shape a polished responsive experience with readable sections, focused states, and strong visual hierarchy.'],
    ['Result', `${project.name} is presented with a stronger portfolio case-study flow.`]
  ],
  process: ['Understand', 'Structure', 'Design', 'Build', 'Deploy'].map((step) => [step, project.note]),
  results: ['Live deployment', 'Responsive interface', 'Portfolio-ready case study']
}

const posts = [
  {
    slug: 'owasp-for-nigerian-developers',
    title: 'Why Every Developer Should Learn the OWASP Top 10 Before Their Next Job',
    date: 'May 2025',
    read: '6 min',
    tags: ['Security', 'Career'],
    excerpt: 'Security knowledge is no longer optional. It is the difference between shipping features and protecting people.'
  },
  {
    slug: 'figma-to-react-gap',
    title: 'Figma to React: The Gap Nobody Talks About',
    date: 'March 2025',
    read: '8 min',
    tags: ['Design', 'Frontend'],
    excerpt: 'The handoff is not a file. It is a translation between intention, constraints, and production behavior.'
  },
  {
    slug: 'password-manager-trust',
    title: 'What Building a Password Manager Taught Me About Trusting No One',
    date: 'January 2025',
    read: '5 min',
    tags: ['Full Stack', 'Security'],
    excerpt: 'Trust is not a vibe. It is a system of choices you make before the user ever signs in.'
  }
]

function App() {
  const [path, setPath] = useState(() => {
    const initialPath = window.location.pathname
    if (initialPath.startsWith('/work/')) {
      window.history.replaceState({}, '', '/')
      return '/'
    }
    return resolveRoute(initialPath).type === 'notFound' ? '/' : initialPath
  })
  const [scrolled, setScrolled] = useState(false)
  const [transitionTone, setTransitionTone] = useState('gold')
  const [showPreloader, setShowPreloader] = useState(() => sessionStorage.getItem('ftk-visited') !== 'true')
  const [theme, setTheme] = useState(() => localStorage.getItem('faith-theme') || 'royal')

  useEffect(() => {
    let ticking = false
    const onPop = () => setPath(window.location.pathname)
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        ticking = false
        setScrolled((value) => {
          const next = window.scrollY > 80
          return value === next ? value : next
        })
      })
    }
    window.addEventListener('popstate', onPop)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('popstate', onPop)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.dataset.route = path.startsWith('/security') ? 'security' : 'default'
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('faith-theme', theme)
  }, [theme])

  const navigate = useCallback((to) => {
    if (to === window.location.pathname) return
    setTransitionTone((tone) => (tone === 'gold' ? 'indigo' : 'gold'))
    window.history.pushState({}, '', to)
    setPath(to)
  }, [])

  const route = useMemo(() => resolveRoute(path), [path])

  return (
    <>
      <Atmosphere />
      <AnimatePresence>
        {showPreloader && <Preloader onDone={() => {
          sessionStorage.setItem('ftk-visited', 'true')
          setShowPreloader(false)
        }} />}
      </AnimatePresence>
      <Navbar path={path} scrolled={scrolled} navigate={navigate} />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <main>
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <PageRenderer route={route} navigate={navigate} />
        </motion.div>
      </main>
      <PageCurtain tone={transitionTone} path={path} />
      <Footer navigate={navigate} />
      <BackToTop />
    </>
  )
}

function ThemeSwitcher({ theme, setTheme }) {
  const themes = [
    ['royal', 'Royal'],
    ['midnight', 'Midnight'],
    ['velvet', 'Velvet'],
    ['ivory', 'Ivory']
  ]
  return (
    <div className="theme-switcher" aria-label="Color theme">
      {themes.map(([value, label]) => (
        <button key={value} type="button" className={theme === value ? 'active' : ''} onClick={() => setTheme(value)} aria-label={`${label} theme`}>
          <span className={`theme-dot ${value}`} />
        </button>
      ))}
    </div>
  )
}

function resolveRoute(path) {
  if (path === '/') return { type: 'home' }
  if (path === '/about') return { type: 'about' }
  if (path === '/work') return { type: 'work' }
  if (path.startsWith('/work/')) return { type: 'project', slug: path.split('/').pop() }
  if (path === '/security') return { type: 'security' }
  if (path === '/contact') return { type: 'contact' }
  return { type: 'notFound' }
}

function PageRenderer({ route, navigate }) {
  if (route.type === 'home') return <HomePage navigate={navigate} />
  if (route.type === 'about') return <AboutPage />
  if (route.type === 'work') return <WorkPage navigate={navigate} />
  if (route.type === 'project') return <ProjectPage slug={route.slug} navigate={navigate} />
  if (route.type === 'security') return <SecurityPage />
  if (route.type === 'contact') return <ContactPage />
  return <HomePage navigate={navigate} />
}

function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <div className="orb orb-indigo" />
      <div className="orb orb-gold" />
      <div className="orb orb-cyan" />
    </div>
  )
}

function Preloader({ onDone }) {
  useEffect(() => {
    const done = setTimeout(onDone, 650)
    return () => clearTimeout(done)
  }, [onDone])

  return (
    <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 0.22 }}>
      <div className="preloader-line" />
      <div className="preloader-mark">
        {['F', 'T', 'K'].map((letter, index) => (
          <motion.span
            key={letter}
            initial={{ y: -32, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.08 + index * 0.06, duration: 0.22, ease: 'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="preloader-progress"><span /></div>
    </motion.div>
  )
}
function PageCurtain() {
  return null
}

function Navbar({ path, scrolled, navigate }) {
  const [open, setOpen] = useState(false)
  const linkClick = (href) => {
    navigate(href)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return undefined
    const closeOnScroll = () => setOpen(false)
    window.addEventListener('scroll', closeOnScroll, { passive: true })
    return () => window.removeEventListener('scroll', closeOnScroll)
  }, [open])

  return (
    <header className={`site-nav ${scrolled ? 'scrolled' : ''}`}>
      <button className="logo" onClick={() => linkClick('/')}>
        <span>Faith</span><code>.dev</code>
      </button>
      <nav className="desktop-nav">
        {routes.slice(1).map(([href, label]) => (
          <button key={href} className={activePath(path, href) ? 'active' : ''} onClick={() => linkClick(href)}>
            {label}
          </button>
        ))}
      </nav>
      <a className="hire-button" href="/contact" onClick={(event) => { event.preventDefault(); linkClick('/contact') }}>Hire Me</a>
      <button className={`menu-button ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span />
        <span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}>
            {routes.slice(1).map(([href, label], index) => (
              <motion.button
                key={href}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.06 }}
                onClick={() => linkClick(href)}
              >
                {label}
              </motion.button>
            ))}
            <div className="mobile-socials">
              {profileLinks.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function activePath(path, href) {
  if (href === '/work') return path.startsWith('/work')
  return path === href
}

function SectionTitle({ eyebrow, title, watermark }) {
  return (
    <div className="section-title">
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {watermark && <strong aria-hidden="true">{watermark}</strong>}
    </div>
  )
}

function PageHero({ label, title, text }) {
  return (
    <section className="page-hero">
      <span>{label}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}

function HomePage({ navigate }) {
  const [track, setTrack] = useState('engineering')
  const isDesign = track === 'design'

  return (
    <>
      <section className={`hero ${isDesign ? 'design-track' : 'engineering-track'}`}>
        <HeroMesh />
        <div className="hero-content">
          <motion.div className="role-badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {isDesign ? 'UI/UX Portfolio Track - Coming Soon' : 'Full Stack / Frontend / Cybersecurity / Mobile'}
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.18 } } }}>
            {(isDesign ? ['UI/UX Track.', 'Coming Soon.'] : ['I Build It.', 'I Secure It.']).map((line) => (
              <motion.span key={line} variants={{ hidden: { opacity: 0, filter: 'blur(18px)' }, show: { opacity: 1, filter: 'blur(0px)' } }}>
                {line.includes('Secure') || line.includes('Coming') ? <><em>{line}</em></> : line}
              </motion.span>
            ))}
          </motion.h1>
          <p>{isDesign ? 'A separate UI/UX case-study portfolio is being prepared with Figma flows, product thinking, wireframes, prototypes, and polished design systems.' : 'Engineering-focused portfolio for full-stack development, frontend systems, cybersecurity products, AI tools, and mobile app development.'}</p>
          <TrackSelector active={track} setActive={setTrack} />
          {!isDesign ? <RoleTicker /> : <div className="design-hero-note"><strong>Coming soon</strong><span>Figma case studies, UX research, product flows, and interface systems will live here.</span></div>}
          <div className="hero-actions">
            {isDesign ? <button onClick={() => setTrack('engineering')}>Back to Engineering Portfolio</button> : <a href="/work" onClick={(event) => { event.preventDefault(); navigate('/work') }}>See Engineering Work</a>}
            <a href="/FaithKareem_CV.pdf" target="_blank" rel="noreferrer">View CV</a>
          </div>
        </div>
      </section>
      <Marquee />
      {isDesign ? <UiUxComingSoon /> : <>
        <AboutPreview navigate={navigate} />
        <LiveBuildsSection compact navigate={navigate} />
        <Services />
        <Testimonials />
        <CtaBanner navigate={navigate} />
      </>}
    </>
  )
}

function TrackSelector({ active, setActive }) {
  const tracks = [
    ['engineering', 'Full Stack / Cybersecurity', ['React', 'Node.js', 'MongoDB', 'Auth', 'OWASP', 'APIs']],
    ['design', 'UI/UX Designer', ['Figma', 'Wireframes', 'Prototypes', 'UX Research', 'Design Systems']]
  ]

  return (
    <div className="track-selector" aria-label="Portfolio track selector">
      {tracks.map(([id, label, tools]) => (
        <button key={id} type="button" className={`track-button ${id} ${active === id ? 'active' : ''}`} onClick={() => setActive(id)}>
          <span>{label}</span>
          <div aria-hidden="true">{tools.map((tool, index) => <i key={tool} style={{ '--i': index }}>{tool}</i>)}</div>
        </button>
      ))}
    </div>
  )
}

function UiUxComingSoon() {
  const cards = [
    ['Figma Systems', 'Design-system files, components, variants, and polished interface screens are being prepared.'],
    ['UX Case Studies', 'Research notes, user flows, journey maps, and problem-to-solution stories will be added here.'],
    ['Prototype Work', 'Clickable flows, mobile screens, and product interaction demos are coming soon.']
  ]

  return (
    <section className="section design-coming-soon">
      <SectionTitle eyebrow="UI/UX TRACK" title="Design portfolio coming soon." watermark="UX" />
      <p className="section-note">This portfolio is currently focused on engineering work. The UI/UX track has its own space so recruiters can review design work separately when it is ready.</p>
      <div>{cards.map(([title, text]) => <article key={title}><span>Coming Soon</span><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>
  )
}

function HeroMesh() {
  return (
    <div className="hero-mesh" aria-hidden="true">
      <div className="mesh-core" />
      {Array.from({ length: 9 }).map((_, index) => <span key={index} />)}
    </div>
  )
}

function RoleTicker() {
  const roles = ['Full Stack Developer', 'Frontend Developer', 'Cybersecurity Builder', 'Mobile App Developer']
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % roles.length), 2500)
    return () => clearInterval(timer)
  }, [])
  return <p className="role-ticker">Currently: <motion.span key={roles[index]} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{roles[index]}</motion.span></p>
}

function Marquee() {
  const text = 'FULL STACK DEVELOPMENT - FRONTEND DEVELOPMENT - CYBERSECURITY - MOBILE APP DEVELOPMENT - AI TOOLS - AVAILABLE FOR HIRE - FAITH TEMILOLUWA KAREEM -'
  return <div className="marquee"><span>{text} {text}</span></div>
}

function AboutPreview({ navigate }) {
  return (
    <section className="section split-section">
      <div className="hex-portrait">
        <div className="hexagon">
          <img src="/faith-temiloluwa-kareem.png" alt="Faith Temiloluwa Kareem" />
        </div>
        {['Figma', 'React', 'Node', 'Kali'].map((tool, index) => <i key={tool} style={{ '--i': index }}>{tool}</i>)}
      </div>
      <div>
        <SectionTitle eyebrow="01 - WHO I AM" title="A builder with a global vision." watermark="ABOUT" />
        <p className="large-copy">Computer Science student building full-stack products, frontend systems, cybersecurity dashboards, AI tools, and mobile app experiences with a practical security-first mindset.</p>
        <div className="stats-grid">
          {['3+ Years Building', '12+ Projects Shipped', '4 Domains Mastered', '100% Passion Always'].map((stat) => (
            <article key={stat}><strong>{stat.split(' ')[0]}</strong><span>{stat.split(' ').slice(1).join(' ')}</span></article>
          ))}
        </div>
        <button className="text-link" onClick={() => navigate('/about')}>Read My Story</button>
      </div>
    </section>
  )
}

function FeaturedProjects({ navigate }) {
  return (
    <section className="section">
      <SectionTitle eyebrow="02 - PROJECT WORK" title="Project work I have done." watermark="WORK" />
      <p className="section-note">A curated preview of selected work. More projects are coming as I keep building, shipping, and improving.</p>
      <div className="project-rows">
        {liveBuilds.slice(0, 3).map((project, index) => (
          <button key={project.slug} className={`project-row ${project.color}`} onClick={() => navigate(`/work/${project.slug}`)}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div><h3>{project.name}</h3><p>{project.note}</p></div>
            <small>{project.category}</small>
            <b>View</b>
          </button>
        ))}
      </div>
      <button className="wide-link" onClick={() => navigate('/work')}>View All Work - More Coming</button>
    </section>
  )
}

function LiveBuildsSection({ compact = false, navigate }) {
  const buildsToShow = (compact ? selectedLiveBuilds : liveBuilds).filter((build) => build.url)

  return (
    <section className={`section live-builds ${compact ? 'compact' : ''}`}>
      <SectionTitle eyebrow="DEPLOYED PROJECTS" title={compact ? 'Real deployed projects.' : 'Real deployed projects you can open.'} watermark="LIVE" />
      <p className="section-note">
        {compact
          ? 'Live portfolio projects with working links, clean product stories, and recruiter-friendly proof of delivery.'
          : 'These are the live deployed builds available now, each with a case study and direct demo link.'}
      </p>
      <div className="live-build-grid">
        {buildsToShow.map((build, index) => (
          <article key={build.url} className="live-build-card">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{build.name}</strong>
              <small>{build.type}</small>
              <p>{build.note}</p>
              <div className="live-build-actions">
                <a href={`/work/${build.slug}`} onClick={(event) => { if (navigate) { event.preventDefault(); navigate(`/work/${build.slug}`) } }}>Case Study</a>
                <a href={build.url} target="_blank" rel="noreferrer">Live Demo</a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {compact ? <a className="wide-link" href="/work" onClick={(event) => { if (navigate) { event.preventDefault(); navigate('/work') } }}>See All Deployed Projects</a> : null}
    </section>
  )
}

function Services() {
  const items = [
    ['01', 'Full Stack Engineering', 'APIs, dashboards, authentication, and deployment-ready systems.'],
    ['02', 'Frontend Development', 'Responsive React builds with clean interaction and production polish.'],
    ['03', 'Cybersecurity', 'Security-first thinking rooted in OWASP, testing, and risk awareness.'],
    ['04', 'Mobile App Development', 'Mobile-first interfaces, app flows, and scalable user experiences.']
  ]
  return (
    <section className="section">
      <SectionTitle eyebrow="03 - WHAT I DO" title="Engineering disciplines. One builder." watermark="SERVICES" />
      <div className="services-grid">
        {items.map(([number, title, text]) => <article key={title}><IconMark /><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
      </div>
    </section>
  )
}

function IconMark() {
  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 24 24 8l16 16-16 16L8 24Z" /><path d="M16 24h16M24 16v16" /></svg>
}

function Testimonials() {
  return (
    <section className="section">
      <SectionTitle eyebrow="04 - WHAT THEY SAY" title="Credibility with range." watermark="PROOF" />
      <div className="testimonials">
        <article><p>"Faith delivered a product that looked like it had a premium design budget. Hired her again the same week."</p><strong>Emeka S. - Startup Founder</strong></article>
        <article><p>"The rarest of talents: she can walk into a design critique and a security debrief. Her range is unmatched."</p><strong>Adaeze O. - Senior Product Lead</strong></article>
      </div>
    </section>
  )
}

function CtaBanner({ navigate }) {
  return (
    <section className="cta-banner">
      <strong aria-hidden="true">FAITH</strong>
      <h2>Let's build something that matters.</h2>
      <p>Available for freelance, remote roles, and internships.</p>
      <a className="cta-button" href="mailto:omolarak724@gmail.com">Start a Conversation</a>
    </section>
  )
}

function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="about-portrait-card">
          <img src="/faith-temiloluwa-kareem.png" alt="Faith Temiloluwa Kareem" />
          <div>
            <span>Open to remote work</span>
            <strong>Designs. Builds. Secures.</strong>
          </div>
        </div>
        <div className="about-hero-copy">
          <span>ABOUT FAITH</span>
          <h1>The person behind the pixels.</h1>
          <p>
            I am Faith Temiloluwa Kareem, a Computer Science student building AI-powered cybersecurity and full-stack solutions. I care about security operations, intelligent automation, cloud technologies, and software that solves real-world problems.
          </p>
          <p>
            My strength is range: I can think through the user experience, build the interface, connect the system, and ask how it could be attacked. That is the kind of builder I am becoming.
          </p>
          <div className="about-link-row">
            {profileLinks.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>)}
          </div>
        </div>
      </section>
      <section className="section about-statement">
        <SectionTitle eyebrow="01 - IDENTITY" title="An engineer's discipline, a frontend eye, and a security mindset." watermark="FAITH" />
        <div className="about-statement-grid">
          <article>
            <span>Frontend</span>
            <p>I build responsive interfaces that feel clear, credible, and useful across devices.</p>
          </article>
          <article>
            <span>Engineering</span>
            <p>I build React interfaces, full-stack flows, dashboards, and deployable products with a practical builder's mindset.</p>
          </article>
          <article>
            <span>Security</span>
            <p>I study OWASP, testing workflows, and secure product decisions so the things I build are not fragile.</p>
          </article>
        </div>
      </section>
      <SkillsDeepDive />
      <Timeline />
      <Values />
    </>
  )
}

function SkillsDeepDive() {
  const panels = [
    ['01 / FRONTEND', 'I turn ideas into responsive interfaces.', ['React', 'JavaScript', 'Tailwind CSS', 'HTML & CSS']],
    ['02 / FULL STACK', 'I connect interfaces to real systems.', ['Node.js', 'MongoDB', 'REST API Design', 'Authentication']],
    ['03 / SECURITY', 'I build with risk in mind.', ['Penetration Testing', 'Burp Suite', 'OWASP Top 10', 'Kali Linux']],
    ['04 / MOBILE', 'I plan app screens and mobile-first flows.', ['React Native', 'Mobile UX', 'Responsive UI', 'App Architecture']]
  ]
  return <section className="skills-panels">{panels.map(([label, title, skills]) => <article key={label}><span>{label}</span><h2>{title}</h2><div>{skills.map((skill) => <p key={skill}>{skill}</p>)}</div></article>)}</section>
}

function Timeline() {
  const steps = ['2022 - Started HTML/CSS and frontend development', '2023 - Built first React app', '2024 - Discovered cybersecurity', '2024 - Completed DVWA pentest', '2025 - Building full-stack, security, and mobile projects']
  return <section className="section"><SectionTitle eyebrow="JOURNEY" title="Built one layer at a time." watermark="TIMELINE" /><div className="timeline">{steps.map((step) => <article key={step}><span /> <p>{step}</p></article>)}</div></section>
}

function Values() {
  return <section className="values">{['Design is not decoration. It is strategy.', "Code that is not secure is a liability, not an asset.", 'I build with pressure, clarity, and purpose.'].map((value, index) => <p key={value}><span>0{index + 1}</span>{value}</p>)}</section>
}

function WorkPage({ navigate }) {
  return (
    <>
      <PageHero label="ALL WORK" title="Everything I have worked on." text="A complete collection of my deployed full-stack, frontend, cybersecurity, AI, ecommerce, dashboard, and productivity projects." />
      <section className="section work-index">
        <SectionTitle eyebrow="DEPLOYED PROJECTS" title="All deployed projects I have worked on." watermark="LIVE" />
        <p className="section-note">Every project below includes a case study button and a direct live demo link.</p>
        <div className="work-grid">
          {liveBuilds.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />)}
        </div>
      </section>
    </>
  )
}

function ProjectCard({ project, index = 0, navigate }) {
  return (
    <article className={`project-card ${project.color}`}>
      <div className="project-card-top"><span>{String(index + 1).padStart(2, '0')}</span><small>{project.category}</small></div>
      <ProjectPreview project={project} />
      <h3>{project.name}</h3>
      <p>{project.note}</p>
      <div className="tag-row">{project.filters.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button onClick={() => navigate(`/work/${project.slug}`)}>View Case Study</button>
      {project.comingSoon ? <span className="coming-soon-link">Coming Soon</span> : <a href={project.url} target="_blank" rel="noreferrer">Live Demo</a>}
    </article>
  )
}

function ProjectPreview({ project }) {
  const labels = project.filters.slice(0, 3)
  return (
    <div className={`project-art preview-frame static-preview ${project.color}`}>
      <div className="static-preview-shell">
        <span>{project.type}</span>
        <strong>{project.name}</strong>
        <div>{labels.map((label) => <i key={label}>{label}</i>)}</div>
      </div>
      <span className="preview-live-dot">Case study</span>
    </div>
  )
}

function ProjectPage({ slug, navigate }) {
  const project = liveBuilds.find((item) => item.slug === slug) || liveBuilds[0]
  const next = liveBuilds[(liveBuilds.findIndex((item) => item.slug === project.slug) + 1) % liveBuilds.length]
  const study = getCaseStudy(project)
  return (
    <>
      <section className={`project-hero ${project.color}`}>
        <div><span>{project.type}</span><h1>{project.name}</h1><p>{study.outcome}</p><div className="tag-row">{project.filters.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.url ? <a className="live-project-link" href={project.url} target="_blank" rel="noreferrer">Open Live Project</a> : <span className="coming-soon-link">Coming Soon</span>}</div>
        <div className="project-brief-panel">
          <span>Case Study Brief</span>
          <p>{project.note}</p>
          <strong>{study.role}</strong>
        </div>
      </section>
      <section className="overview-row">{[['Role', study.role], ['Category', project.category], ['Type', project.type], ['Status', project.url ? 'Live deployment' : 'Coming soon']].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
      <section className="section problem-solution">
        <article><span>The Problem</span><p>{study.problem}</p></article>
        <article><span>My Approach</span><p>{study.approach}</p></article>
      </section>
      <ProjectImageGallery study={study} />
      <section className="section recruiter-snapshot">
        <SectionTitle eyebrow="RECRUITER SNAPSHOT" title="What this project proves." watermark="VALUE" />
        <div>
          <article><span>Product Skill</span><p>{study.problem}</p></article>
          <article><span>Technical Judgment</span><p>{study.approach}</p></article>
          <article><span>Delivery Signal</span><p>{study.outcome}</p></article>
        </div>
      </section>
      <CaseStudyCards project={project} study={study} />
      <section className="section process">
        <SectionTitle eyebrow="PROCESS" title="Research. Define. Design. Build. Ship." watermark="PROCESS" />
        {study.process.map(([step, text], index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{text}</p></article>)}
      </section>
      <section className="results-row">{study.results.map((result) => <article key={result}><strong>{result.split(' ')[0]}</strong><span>{result.split(' ').slice(1).join(' ')}</span></article>)}</section>
      <button className={`next-project ${next.color}`} onClick={() => navigate(`/work/${next.slug}`)}>Next Project - {next.name}</button>
    </>
  )
}

function ProjectImageGallery({ study }) {
  if (!study.images?.length) return null
  return (
    <section className="section project-image-gallery">
      <SectionTitle eyebrow="PRODUCT SCREENS" title="Interface details from the live build." watermark="UI" />
      <div>
        {study.images.map(([src, title, caption]) => (
          <figure key={src}>
            <img src={src} alt={title} loading="lazy" />
            <figcaption><strong>{title}</strong><span>{caption}</span></figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function CaseStudyCards({ project, study }) {
  return (
    <section className="section case-study-cards">
      <SectionTitle eyebrow="CASE STUDY" title="Detailed project decisions." watermark="STUDY" />
      <div>
        {study.cards.map(([title, text], index) => (
          <motion.article
            key={title}
            className={`case-card ${project.color}`}
            initial={{ opacity: 0, y: 28, rotate: index === 1 ? 0 : index === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <i />
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function SecurityPage() {
  const owasp = ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Insecure Design', 'Security Misconfiguration', 'Vulnerable Components', 'Auth Failures', 'Integrity Failures', 'Logging Failures', 'SSRF']
  return (
    <>
      <PageHero label="SECURITY" title="Security Research" text="I do not just build apps. I break them first, so the bad guys cannot." />
      <section className="section security-terminal"><Terminal /></section>
      <section className="section security-grid">
        <SectionTitle eyebrow="OWASP TOP 10" title="My understanding." watermark="OWASP" />
        <div>{owasp.map((item, index) => <article className="security-card" key={item}><span>A{String(index + 1).padStart(2, '0')}</span><h3>{item}</h3><p>Studied and mapped to practical web application risk.</p></article>)}</div>
      </section>
      <section className="section arsenal"><SectionTitle eyebrow="TOOLS I WIELD" title="Security toolkit." watermark="TOOLS" /><p>Kali Linux - Burp Suite - OWASP ZAP - Nmap - SQLMap - Metasploit - Wireshark - DVWA - Hydra - Nikto - Gobuster</p></section>
    </>
  )
}

function Terminal() {
  const lines = [
    'faith@kali:~$ whoami',
    'faith_kareem // security researcher + ethical hacker',
    'sudo nmap -sV -sC -p- 192.168.1.105',
    '80/tcp open http Apache httpd 2.4.54',
    '3306/tcp open mysql MySQL 5.7.39',
    'sqlmap -u "http://target/?id=1" --risk=3 --level=5',
    '[VULN] id is injectable: boolean-based blind',
    '[VULN] reflected XSS found in /search',
    '[SUCCESS] VulnReport_DVWA_2025.pdf generated',
    'Security is not a feature. It is a foundation.'
  ]
  return <div className="terminal-window"><div className="terminal-top"><span /><span /><span /><b>faith@kali</b></div><pre>{lines.map((line) => <code key={line}>{line}{'\n'}</code>)}<i /></pre></div>
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState('')
  const contactMethods = [
    ['GitHub', 'https://github.com/Faith-loves'],
    ['LinkedIn', 'https://www.linkedin.com/in/temiloluwa-faith-kareem-a526b7420'],
    ['Email', 'mailto:omolarak724@gmail.com']
  ]
  const projectTypes = ['Frontend build', 'Full-stack app', 'Cybersecurity product', 'Mobile app', 'AI interface']

  return (
    <section className="contact-page refined-contact">
      <div className="contact-intro">
        <span className="contact-kicker">CONTACT</span>
        <h1>Let's build<br /><em>the next thing.</em></h1>
        <p>I am open to frontend, full-stack, cybersecurity, AI, and mobile app work. Send the role, project idea, timeline, and the best way to reach you.</p>
        <div className="contact-methods">
          {contactMethods.map(([label, href]) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
              <strong>{label}</strong>
            </a>
          ))}
        </div>

      </div>
      <form className={`contact-form ${sent ? 'sent' : ''}`} onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
        {!sent ? <>
          <div className="form-head">
            <span>START A CONVERSATION</span>
            <p>Use this form to draft your message. You can also email me directly.</p>
          </div>
          <div className="field-grid">
            <label>Name<input required placeholder="Your name" /></label>
            <label>Email<input required type="email" placeholder="you@example.com" /></label>
          </div>
          <label>What do you need?
            <select>
              {projectTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
          <label>Message
            <textarea required value={message} onChange={(event) => setMessage(event.target.value)} maxLength="500" placeholder="Tell me what you are building, the deadline, and what success should look like." />
          </label>
          <div className="form-foot">
            <small>{message.length}/500</small>
            <a href="mailto:omolarak724@gmail.com">Email directly</a>
          </div>
          <button>Send Message</button>
        </> : <div className="thanks"><span>READY</span><h2>Message prepared</h2><p>Thank you. You can also send the details directly to omolarak724@gmail.com.</p><a href="mailto:omolarak724@gmail.com">Open email</a></div>}
      </form>
    </section>
  )
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div><button className="logo" onClick={() => navigate('/')}><span>Faith</span><code>.dev</code></button><p>Designing. Building. Securing.</p><small>2026 Faith Temiloluwa Kareem. All rights reserved.</small></div><nav>{routes.map(([href, label]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}</nav><div><p>Available for new projects.</p><button className="footer-hire" onClick={() => navigate('/contact')}>Hire Me</button><div className="footer-socials">{profileLinks.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>)}</div></div><strong>Designed, built and secured by Faith Temiloluwa Kareem</strong></footer>
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        ticking = false
        setShow((value) => {
          const next = window.scrollY > 400
          return value === next ? value : next
        })
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <button className={`back-top ${show ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>UP</button>
}

createRoot(document.getElementById('root')).render(<App />)



