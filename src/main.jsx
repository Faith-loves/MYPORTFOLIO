import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { AnimatePresence, motion } from 'framer-motion'
import './styles.css'

const routes = [
  ['/', 'Home'],
  ['/work', 'Work'],
  ['/about', 'About'],
  ['/security', 'Security'],
  ['/blog', 'Blog'],
  ['/contact', 'Contact']
]

const profileLinks = [
  ['GitHub', 'https://github.com/Faith-loves'],
  ['LinkedIn', 'https://www.linkedin.com/in/faith-kareem-7676a1332?utm_source=share_via&utm_content=profile&utm_medium=member_android'],
  ['Email', 'mailto:omolarak724@gmail.com']
]

const liveBuilds = [
  {
    slug: 'blockchain-voting',
    name: 'Blockchain Voting',
    type: 'Full Stack + Security',
    category: 'Full Stack',
    filters: ['Full Stack', 'Security'],
    color: 'cyan',
    url: 'https://blockchain-voting-ebop.onrender.com',
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
    url: 'https://sentinelx-frontend.onrender.com/',
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
    slug: 'stockflow',
    name: 'StockFlow',
    type: 'Inventory UI',
    category: 'Dashboard',
    filters: ['Frontend', 'Dashboard'],
    color: 'purple',
    url: 'https://stockflow-ecru.vercel.app/',
    note: 'Inventory dashboard concept for product visibility, stock status, and operational review.'
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
    type: 'Coming Soon',
    category: 'Security',
    filters: ['Security', 'Full Stack'],
    color: 'terminal',
    url: '',
    comingSoon: true,
    note: 'A security-focused password and access management project currently in progress.'
  },
  {
    slug: 'devdocs-ai',
    name: 'DevDocs AI',
    type: 'Coming Soon',
    category: 'AI + Developer Tools',
    filters: ['AI', 'Frontend'],
    color: 'indigo',
    url: '',
    comingSoon: true,
    note: 'An AI documentation assistant concept for helping developers understand and search technical docs faster.'
  },
  {
    slug: 'everafter-weddings',
    name: 'EverAfter Weddings',
    type: 'Coming Soon',
    category: 'Event Website',
    filters: ['Frontend'],
    color: 'gold',
    url: '',
    comingSoon: true,
    note: 'A romantic wedding experience and event showcase project currently being prepared.'
  }
]

const selectedLiveBuildSlugs = ['blockchain-voting', 'sentinelx', 'intern-track']
const selectedLiveBuilds = liveBuilds.filter((build) => selectedLiveBuildSlugs.includes(build.slug))

const projects = [
  {
    slug: 'naijaaudit',
    number: '01',
    name: 'SecureAudit',
    category: 'Full Stack + Cybersecurity',
    filters: ['Full Stack', 'Security'],
    color: 'cyan',
    tags: ['Node.js', 'React', 'MongoDB', 'JWT', 'OWASP'],
    description: 'A web-based security audit dashboard built for small businesses to run automated website vulnerability checks, generate reports, and understand risk.',
    story: 'Many small business websites are exposed without their owners knowing. SecureAudit makes security accessible without needing a cybersecurity degree.',
    role: 'Full-stack builder',
    timeline: '6 weeks',
    tools: 'React, Node, MongoDB',
    status: 'Concept case study',
    problem: 'Small businesses often do not know their websites are exposed until something breaks or customer trust is already damaged.',
    approach: 'I designed a dashboard that translates technical scan results into plain-language risk signals, remediation steps, and exportable reports.',
    results: ['10 OWASP risks mapped', '24-page report flow', '3 scan states designed'],
    links: ['Live Demo', 'GitHub', 'Read Report']
  },
  {
    slug: 'solva',
    number: '02',
    name: 'Solva',
    category: 'UI/UX Design',
    filters: ['UI/UX'],
    color: 'indigo',
    tags: ['Figma', 'Design System', 'Mobile App', 'Research'],
    description: 'A fintech mobile app concept helping freelancers track income, manage taxes, and invoice clients across currencies.',
    story: 'Freelancers lose money through missed invoices and messy tracking. Solva gives that workflow a calm financial home.',
    role: 'Product designer',
    timeline: '4 weeks',
    tools: 'Figma, Research, Prototype',
    status: 'Design case study',
    problem: 'Freelancers need invoicing and income clarity without enterprise finance complexity.',
    approach: 'I shaped the app around quick income capture, simple invoice states, and a compact design system for repeated financial actions.',
    results: ['52 components designed', '7 user flows mapped', '4 prototype states'],
    links: ['View Figma', 'Case Study']
  },
  {
    slug: 'vulnreport',
    number: '03',
    name: 'VulnReport',
    category: 'Cybersecurity Research',
    filters: ['Security'],
    color: 'terminal',
    tags: ['Pentesting', 'Burp Suite', 'DVWA', 'OWASP', 'PDF'],
    description: 'A professional penetration testing report covering SQL Injection, XSS, CSRF, and brute-force vulnerabilities with remediation steps.',
    story: 'Most junior security learners run tools. This report proves the ability to think like an attacker and write like a consultant.',
    role: 'Security researcher',
    timeline: '3 weeks',
    tools: 'Burp, DVWA, OWASP',
    status: 'Report ready',
    problem: 'Security findings are only useful when the reader understands impact, evidence, and repair priority.',
    approach: 'I documented each vulnerability with proof, risk severity, business impact, and practical remediation language.',
    results: ['4 vuln classes tested', 'CVSS scoring included', 'Executive summary written'],
    links: ['Read Report PDF', 'GitHub']
  },
  {
    slug: 'koto',
    number: '04',
    name: 'Koto',
    category: 'Frontend Development',
    filters: ['Frontend'],
    color: 'gold',
    tags: ['React', 'Tailwind', 'Framer Motion', 'Vercel'],
    description: 'A cinematic community events platform with search, filtering, and shareable event cards.',
    story: 'Diaspora communities often organize through scattered chats. Koto turns cultural discovery into a beautiful public product.',
    role: 'Frontend developer',
    timeline: '5 weeks',
    tools: 'React, Tailwind, Motion',
    status: 'Frontend case study',
    problem: 'Community events need trust, discovery, and shareability without feeling like a plain listing directory.',
    approach: 'I designed animated event surfaces, clean filters, and a visual rhythm that makes cultural discovery feel premium.',
    results: ['99 Lighthouse target', '5 event categories', 'Share-card flow'],
    links: ['Live Site', 'GitHub']
  },
  {
    slug: 'securevault',
    number: '05',
    name: 'SecureVault',
    category: 'Full Stack Engineering',
    filters: ['Full Stack', 'Security'],
    color: 'purple',
    tags: ['Node.js', 'MongoDB', 'bcrypt', 'JWT', 'React'],
    description: 'A full-stack encrypted password manager with client-side encryption, authentication, rate limiting, and brute-force protection.',
    story: 'Built because privacy tools should prove trust through architecture, not just a long policy page.',
    role: 'Full-stack engineer',
    timeline: '6 weeks',
    tools: 'React, Express, MongoDB',
    status: 'Architecture case study',
    problem: 'Password managers must feel simple to use while respecting the seriousness of sensitive data.',
    approach: 'I planned a secure-by-default flow with encryption before storage, protected authentication, and clear vault interactions.',
    results: ['AES flow planned', 'JWT auth model', 'Rate limiting included'],
    links: ['Live Demo', 'GitHub']
  }
]

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
  const [path, setPath] = useState(() => window.location.pathname)
  const [scrolled, setScrolled] = useState(false)
  const [transitionTone, setTransitionTone] = useState('gold')
  const [showPreloader, setShowPreloader] = useState(() => sessionStorage.getItem('ftk-visited') !== 'true')
  const [theme, setTheme] = useState(() => localStorage.getItem('faith-theme') || 'royal')

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('popstate', onPop)
    window.addEventListener('scroll', onScroll)
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

  const navigate = (to) => {
    if (to === path) return
    setTransitionTone((tone) => (tone === 'gold' ? 'indigo' : 'gold'))
    window.history.pushState({}, '', to)
    setPath(to)
  }

  const route = useMemo(() => resolveRoute(path), [path])

  return (
    <>
      <Atmosphere />
      <CustomCursor />
      <AnimatePresence>
        {showPreloader && <Preloader onDone={() => {
          sessionStorage.setItem('ftk-visited', 'true')
          setShowPreloader(false)
        }} />}
      </AnimatePresence>
      <Navbar path={path} scrolled={scrolled} navigate={navigate} />
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={path}
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, filter: 'blur(10px)' }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <PageRenderer route={route} navigate={navigate} />
          </motion.div>
        </AnimatePresence>
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
  if (path === '/blog') return { type: 'blog' }
  if (path.startsWith('/blog/')) return { type: 'post', slug: path.split('/').pop() }
  if (path === '/contact') return { type: 'contact' }
  return { type: 'notFound' }
}

function PageRenderer({ route, navigate }) {
  if (route.type === 'home') return <HomePage navigate={navigate} />
  if (route.type === 'about') return <AboutPage />
  if (route.type === 'work') return <WorkPage navigate={navigate} />
  if (route.type === 'project') return <ProjectPage slug={route.slug} navigate={navigate} />
  if (route.type === 'security') return <SecurityPage />
  if (route.type === 'blog') return <BlogPage navigate={navigate} />
  if (route.type === 'post') return <BlogPostPage slug={route.slug} navigate={navigate} />
  if (route.type === 'contact') return <ContactPage />
  return <NotFound navigate={navigate} />
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

function CustomCursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const label = useRef(null)

  useEffect(() => {
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf

    const move = (event) => {
      x = event.clientX
      y = event.clientY
      dot.current?.style.setProperty('--x', `${x}px`)
      dot.current?.style.setProperty('--y', `${y}px`)
    }
    const animate = () => {
      rx += (x - rx) * 0.12
      ry += (y - ry) * 0.12
      ring.current?.style.setProperty('--x', `${rx}px`)
      ring.current?.style.setProperty('--y', `${ry}px`)
      raf = requestAnimationFrame(animate)
    }
    const over = (event) => {
      const target = event.target.closest('a, button, .project-card, .project-row, .security-card')
      if (!target) return
      const text = target.classList.contains('project-card') || target.classList.contains('project-row')
        ? 'OPEN'
        : target.classList.contains('security-card')
          ? 'SCAN'
          : 'VIEW'
      ring.current?.classList.add('cursor-active')
      label.current.textContent = text
    }
    const out = (event) => {
      if (!event.target.closest('a, button, .project-card, .project-row, .security-card')) return
      ring.current?.classList.remove('cursor-active')
      label.current.textContent = ''
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    animate()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring}><span ref={label} /></div>
    </>
  )
}

function Preloader({ onDone }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setCount((n) => Math.min(100, n + 4)), 42)
    const done = setTimeout(onDone, 2600)
    return () => {
      clearInterval(timer)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.div className="preloader" exit={{ y: '-100%' }} transition={{ duration: 0.55 }}>
      <div className="preloader-line" />
      <div className="preloader-mark">
        {['F', 'T', 'K'].map((letter, index) => (
          <motion.span
            key={letter}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 + index * 0.18, type: 'spring', stiffness: 220, damping: 12 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      <div className="preloader-progress"><span style={{ width: `${count}%` }} /></div>
      <p>{count}%</p>
    </motion.div>
  )
}

function PageCurtain({ tone, path }) {
  return (
    <motion.div
      key={`${path}-${tone}`}
      className={`page-curtain ${tone}`}
      initial={{ y: '100%' }}
      animate={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
      aria-hidden="true"
    />
  )
}

function Navbar({ path, scrolled, navigate }) {
  const [open, setOpen] = useState(false)
  const linkClick = (href) => {
    navigate(href)
    setOpen(false)
  }

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
      <button className="hire-button" onClick={() => linkClick('/contact')}>Hire Me</button>
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
  if (href === '/blog') return path.startsWith('/blog')
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

function HomePage({ navigate }) {
  return (
    <>
      <section className="hero">
        <HeroMesh />
        <div className="hero-content">
          <motion.div className="role-badge" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            {'Open to Global Opportunities'}
          </motion.div>
          <motion.h1 initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.24 } } }}>
            {['I Design It.', 'I Build It.', 'I Secure It.'].map((line) => (
              <motion.span key={line} variants={{ hidden: { opacity: 0, filter: 'blur(28px)' }, show: { opacity: 1, filter: 'blur(0px)' } }}>
                {line.includes('Secure') ? <>I <em>Secure</em> It.</> : line}
              </motion.span>
            ))}
          </motion.h1>
          <p>A multidisciplinary technologist crafting digital products that are beautiful, functional, and secure.</p>
          <RoleTicker />
          <div className="hero-actions">
            <button onClick={() => navigate('/work')}>See My Work</button>
            <a href="/Faith-Temiloluwa-Kareem-CV.pdf" download>Download CV</a>
          </div>
        </div>
        <div className="scroll-indicator"><span>SCROLL</span><i /></div>
      </section>
      <Marquee />
      <AboutPreview navigate={navigate} />
      <FeaturedProjects navigate={navigate} />
      <LiveBuildsSection compact navigate={navigate} />
      <Services />
      <Testimonials />
      <CtaBanner navigate={navigate} />
    </>
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
  const roles = ['UI/UX Designer', 'Frontend Developer', 'Full Stack Engineer', 'Security Researcher']
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setIndex((n) => (n + 1) % roles.length), 2500)
    return () => clearInterval(timer)
  }, [])
  return <p className="role-ticker">Currently: <motion.span key={roles[index]} initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{roles[index]}</motion.span></p>
}

function Marquee() {
  const text = 'UI/UX DESIGN - FRONTEND DEVELOPMENT - FULL STACK - CYBERSECURITY - AVAILABLE FOR HIRE - THINKING GLOBALLY - MORE PROJECTS COMING - FAITH TEMILOLUWA KAREEM -'
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
        <p className="large-copy">Computer Science student building AI-powered cybersecurity and full-stack solutions. I design the interface, build the system, and think about how it can be protected before it reaches users.</p>
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
  const buildsToShow = compact ? selectedLiveBuilds : liveBuilds

  return (
    <section className={`section live-builds ${compact ? 'compact' : ''}`}>
      <SectionTitle eyebrow="REAL DEPLOYED LINKS" title={compact ? 'Selected live builds you can open.' : 'Live builds you can open.'} watermark="LIVE" />
      <p className="section-note">
        {compact
          ? 'A few deployed highlights are shown here. The full project archive lives on the Work page, and more projects are coming.'
          : 'This list will keep growing. These are the deployed builds available now, with more project work on the way.'}
      </p>
      <div className="live-build-grid">
        {buildsToShow.map((build, index) => (
          <a key={build.url} href={build.url} target="_blank" rel="noreferrer">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{build.name}</strong>
              <small>{build.type}</small>
              <p>{build.note}</p>
            </div>
            <b>Open</b>
          </a>
        ))}
      </div>
      {compact && navigate ? <button className="wide-link" onClick={() => navigate('/work')}>See Full Project Archive</button> : null}
    </section>
  )
}

function Services() {
  const items = [
    ['01', 'UI/UX Design', 'Interfaces with structure, intention, and a premium user rhythm.'],
    ['02', 'Frontend Dev', 'Responsive React builds with motion, polish, and clean interaction.'],
    ['03', 'Full Stack Engineering', 'APIs, dashboards, authentication, and deployment-ready systems.'],
    ['04', 'Security Research', 'Security-first thinking rooted in OWASP, testing, and risk awareness.']
  ]
  return (
    <section className="section">
      <SectionTitle eyebrow="03 - WHAT I DO" title="Four disciplines. One builder." watermark="SERVICES" />
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
      <button onClick={() => navigate('/contact')}>Start a Conversation</button>
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
        <SectionTitle eyebrow="01 - IDENTITY" title="A designer's eye, an engineer's discipline, a security mindset." watermark="FAITH" />
        <div className="about-statement-grid">
          <article>
            <span>Design</span>
            <p>I use layout, typography, and product thinking to make interfaces feel clear, credible, and useful.</p>
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
    ['01 / DESIGN', 'I design clean, useful product experiences.', ['Figma', 'Wireframing', 'Prototyping', 'Design Systems']],
    ['02 / FRONTEND', 'I turn ideas into responsive interfaces.', ['React', 'JavaScript', 'Tailwind CSS', 'HTML & CSS']],
    ['03 / FULL STACK', 'I connect interfaces to real systems.', ['Node.js', 'MongoDB', 'REST API Design', 'Authentication']],
    ['04 / SECURITY', 'I build with risk in mind.', ['Penetration Testing', 'Burp Suite', 'OWASP Top 10', 'Kali Linux']]
  ]
  return <section className="skills-panels">{panels.map(([label, title, skills]) => <article key={label}><span>{label}</span><h2>{title}</h2><div>{skills.map((skill) => <p key={skill}>{skill}</p>)}</div></article>)}</section>
}

function Timeline() {
  const steps = ['2022 - Started UI/UX Design and HTML/CSS', '2023 - Built first React app', '2024 - Discovered cybersecurity', '2024 - Completed DVWA pentest', '2025 - Ready to build globally']
  return <section className="section"><SectionTitle eyebrow="JOURNEY" title="Built one layer at a time." watermark="TIMELINE" /><div className="timeline">{steps.map((step) => <article key={step}><span /> <p>{step}</p></article>)}</div></section>
}

function Values() {
  return <section className="values">{['Design is not decoration. It is strategy.', "Code that is not secure is a liability, not an asset.", 'I build with pressure, clarity, and purpose.'].map((value, index) => <p key={value}><span>0{index + 1}</span>{value}</p>)}</section>
}

function WorkPage({ navigate }) {
  const [filter, setFilter] = useState('All')
  const categories = ['All', 'Frontend', 'Security', 'Full Stack', 'AI', 'Dashboard', 'Ecommerce', 'Productivity']
  const filtered = filter === 'All' ? liveBuilds : liveBuilds.filter((project) => project.filters.includes(filter))
  return (
    <>
      <PageHero label="MY WORK" title="Real projects, categorized clearly." text="Live deployed work across frontend, AI interfaces, cybersecurity dashboards, ecommerce, inventory, productivity, and full-stack/security flows." />
      <section className="section work-index">
        <div className="filters">{categories.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <motion.div layout className="work-grid">
          <AnimatePresence>
            {filtered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />)}
          </AnimatePresence>
        </motion.div>
      </section>
    </>
  )
}

function ProjectCard({ project, index = 0, navigate }) {
  return (
    <motion.article layout className={`project-card ${project.color}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}>
      <div className="project-card-top"><span>{String(index + 1).padStart(2, '0')}</span><small>{project.category}</small></div>
      <ProjectPreview project={project} />
      <h3>{project.name}</h3>
      <p>{project.note}</p>
      <div className="tag-row">{project.filters.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <button onClick={() => navigate(`/work/${project.slug}`)}>View Case Study</button>
      {project.comingSoon ? <span className="coming-soon-link">Coming Soon</span> : <a href={project.url} target="_blank" rel="noreferrer">Live Demo</a>}
    </motion.article>
  )
}

function ProjectPreview({ project }) {
  const host = project.url ? project.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'coming-soon'
  const templates = {
    'blockchain-voting': ['Verify voter', 'Cast ballot', 'Audit trail'],
    'ai-smart-ui': ['Prompt panel', 'AI output', 'Workspace'],
    sentinelx: ['Threat feed', 'Risk map', 'Incident queue'],
    'nevermind-store': ['Product grid', 'Cart drawer', 'Checkout'],
    stockflow: ['Inventory', 'Low stock', 'Reports'],
    'taskflow-pro': ['Today', 'In progress', 'Done'],
    'intern-track': ['Applications', 'Interviews', 'Deadlines']
  }
  const labels = templates[project.slug] || ['Preview', 'Interface', 'Live']

  return (
    <div className={`project-art preview-frame ${project.color}`}>
      <div className="preview-browser">
        <div className="preview-topbar">
          <i /><i /><i />
          <span>{host}</span>
        </div>
        {project.url ? <iframe className="preview-iframe" src={project.url} title={`${project.name} live preview`} loading="lazy" /> : <div className="preview-screen coming-soon-screen">
          <aside>
            <strong>{project.name.slice(0, 2)}</strong>
            <span />
            <span />
            <span />
          </aside>
          <main>
            <div className="preview-hero">
              <small>{project.type}</small>
              <b>{project.name}</b>
            </div>
            <div className="preview-panels">
              {labels.map((label, index) => <span key={label} style={{ '--delay': `${index * 0.35}s` }}>{label}</span>)}
            </div>
            <div className="preview-lines"><i /><i /><i /></div>
          </main>
        </div>}
      </div>
      <span className="preview-live-dot">{project.url ? 'Live preview' : 'Coming soon'}</span>
    </div>
  )
}

function ProjectPage({ slug, navigate }) {
  const project = liveBuilds.find((item) => item.slug === slug) || liveBuilds[0]
  const next = liveBuilds[(liveBuilds.findIndex((item) => item.slug === project.slug) + 1) % liveBuilds.length]
  return (
    <>
      <section className={`project-hero ${project.color}`}>
        <div><span>{project.type}</span><h1>{project.name}</h1><p>{project.note}</p><div className="tag-row">{project.filters.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="live-project-link" href={project.url} target="_blank" rel="noreferrer">Open Live Project</a></div>
        <div className="project-mockup"><b>{project.name}</b><i>{project.category}</i></div>
      </section>
      <section className="overview-row">{[['Role', 'Frontend builder'], ['Category', project.category], ['Type', project.type], ['Status', 'Live deployment']].map(([label, value]) => <article key={label}><span>{label}</span><strong>{value}</strong></article>)}</section>
      <section className="section problem-solution">
        <article><span>The Project</span><p>{project.note}</p></article>
        <article><span>My Approach</span><p>I focused on a clean user flow, responsive layout, readable sections, and a presentation strong enough for a portfolio case study.</p></article>
      </section>
      <CaseStudyCards project={project} />
      <section className="section process">
        <SectionTitle eyebrow="PROCESS" title="Research. Define. Design. Build. Ship." watermark="PROCESS" />
        {['Understand', 'Structure', 'Design', 'Build', 'Deploy'].map((step, index) => <article key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{project.note}</p></article>)}
      </section>
      <section className="section showcase-grid">{[1, 2, 3].map((item) => <div key={item} className={`showcase-shot ${project.color}`}><span>{project.name} visual {item}</span></div>)}</section>
      <LiveBuildsSection compact />
      <section className="results-row">{['Live deployment', 'Responsive interface', 'Portfolio-ready case study'].map((result) => <article key={result}><strong>{result.split(' ')[0]}</strong><span>{result.split(' ').slice(1).join(' ')}</span></article>)}</section>
      <button className={`next-project ${next.color}`} onClick={() => navigate(`/work/${next.slug}`)}>Next Project - {next.name}</button>
    </>
  )
}

function CaseStudyCards({ project }) {
  const cards = [
    ['Challenge', `Make ${project.name} feel clear, useful, and ready for real users.`],
    ['Interface', 'Shape a polished responsive experience with readable cards, focused states, and strong visual hierarchy.'],
    ['Result', `${project.name} is now presented as a live deployed project with a full portfolio case-study flow.`]
  ]

  return (
    <section className="section case-study-cards">
      <SectionTitle eyebrow="CASE STUDY" title="What the project shows." watermark="STUDY" />
      <div>
        {cards.map(([title, text], index) => (
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

function BlogPage({ navigate }) {
  return (
    <>
      <PageHero label="BLOG" title="Thoughts on Design, Code & Security." text="I write when I learn something worth sharing." />
      <section className="section blog-grid">{posts.map((post) => <article key={post.slug} onClick={() => navigate(`/blog/${post.slug}`)}><span>{post.date} - {post.read}</span><h3>{post.title}</h3><p>{post.excerpt}</p><div className="tag-row">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><button>Read Article</button></article>)}</section>
    </>
  )
}

function BlogPostPage({ slug, navigate }) {
  const post = posts.find((item) => item.slug === slug) || posts[0]
  return <article className="post-page"><span>{post.date} - {post.read}</span><h1>{post.title}</h1><div className="tag-row">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p>{post.excerpt}</p><hr /><p>Great digital products are never just beautiful screens. They are decisions, constraints, risks, and tradeoffs made visible. This article is a placeholder for Faith's thinking, written in a clean editorial format that makes the portfolio feel alive and credible.</p><pre><code>{`const faith = {\n  designs: true,\n  builds: true,\n  secures: true\n}`}</code></pre><p>The goal is simple: document what I am learning, show how I think, and make every project easier to trust.</p><button onClick={() => navigate('/blog')}>Back to Blog</button></article>
}

function ContactPage() {
  const [sent, setSent] = useState(false)
  const [message, setMessage] = useState('')
  return (
    <section className="contact-page">
      <div><h1>LET'S<br />BUILD<br /><em>SOMETHING.</em></h1><p>Available for freelance projects, remote roles, and internships. Responsive within 24 hours.</p><div className="social-row">{profileLinks.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>)}</div><code>Remote-friendly<br />omolarak724@gmail.com</code></div>
      <form className={sent ? 'sent' : ''} onSubmit={(event) => { event.preventDefault(); setSent(true) }}>
        {!sent ? <><label>Name<input required /></label><label>Email<input required type="email" /></label><label>Service<select><option>UI/UX Design</option><option>Frontend Dev</option><option>Full Stack</option><option>Security Audit</option><option>Other</option></select></label><label>Message<textarea required value={message} onChange={(event) => setMessage(event.target.value)} maxLength="500" /></label><small>{message.length}/500</small><button>SEND MESSAGE</button></> : <div className="thanks"><h2>MESSAGE SENT</h2><p>I will be in touch within 24 hours.</p></div>}
      </form>
    </section>
  )
}

function PageHero({ label, title, text }) {
  return <section className="page-hero"><span>{label}</span><h1>{title}</h1><p>{text}</p></section>
}

function NotFound({ navigate }) {
  return <section className="page-hero"><span>404</span><h1>Page not found.</h1><p>This room does not exist in the empire yet.</p><button onClick={() => navigate('/')}>Return Home</button></section>
}

function Footer({ navigate }) {
  return <footer className="site-footer"><div><button className="logo" onClick={() => navigate('/')}><span>Faith</span><code>.dev</code></button><p>Designing. Building. Securing.</p><small>2026 Faith Temiloluwa Kareem. All rights reserved.</small></div><nav>{routes.map(([href, label]) => <button key={href} onClick={() => navigate(href)}>{label}</button>)}</nav><div><p>Available for new projects.</p><button onClick={() => navigate('/contact')}>Hire Me</button><div className="footer-socials">{profileLinks.map(([label, href]) => <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{label}</a>)}</div></div><strong>Designed, built and secured by Faith Temiloluwa Kareem</strong></footer>
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <button className={`back-top ${show ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>UP</button>
}

createRoot(document.getElementById('root')).render(<App />)
