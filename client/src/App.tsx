import { useEffect, useRef, useState, type ReactNode } from 'react'
import './App.css'
import {
  LINKS, NAME, HERO, ABOUT, PROJECTS_SECTION, FEATURED_PROJECTS, OTHER_PROJECTS, EXTRA_PROJECTS,
  REPORTS, POSTS, EXPERTISE, EXPERIENCE, EDUCATION, CERTS, WRITING, FAQ, CONTACT, FOOTER,
  type Project, type ExpertiseArea, type TimelineItem,
} from './data'
import HeroPanels from './components/HeroPanels'
import ProjectVisual from './components/ProjectVisual'
import {
  GitHubIcon, LinkedInIcon, SubstackIcon, MailIcon, DownloadIcon, ArrowUpRight,
  PlusIcon, ChevronIcon, MenuIcon, CloseIcon, ChipIcon, CloudIcon, TerminalIcon,
} from './components/Icons'

// ─── helpers ────────────────────────────────────────────────────────────────

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Fades children in once when scrolled into view. */
function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) { setShown(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect() }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal${shown ? ' is-in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const Cursor = () => <span className="cursor" aria-hidden />

const ext = { target: '_blank', rel: 'noreferrer' } as const
const isExternal = (href: string) => /^https?:/.test(href) || href.endsWith('.pdf')
const paras = (s: string) => s.split(/\n\s*\n/)

function CvPill({ className = 'pill pill--secondary', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <a href={LINKS.cv} download className={className} aria-label="Download CV" onClick={onClick}>
      <DownloadIcon width={14} height={14} />Download CV
    </a>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Projects />
        <Expertise />
        <Experience />
        <Education />
        <Certifications />
        <Writing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

// ─── 1. Navigation ──────────────────────────────────────────────────────────

const NAV = [
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#writing', label: 'Writing' },
  { href: '#contact', label: 'Contact' },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`nav${scrolled || open ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav-inner wrap">
        <a href="#top" className="logo" aria-label="Back to top" onClick={close}>
          {NAME}<Cursor />
        </a>
        <nav className="nav-links" aria-label="Primary">
          {NAV.map(n => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <div className="nav-right">
          <a href={LINKS.github} {...ext} className="nav-gh" aria-label="Open GitHub profile">
            <GitHubIcon width={16} height={16} />GitHub
          </a>
          <a href={LINKS.cv} download className="pill pill--primary pill--sm nav-cv" aria-label="Download CV">
            <span className="pill-sq" aria-hidden />Download CV
          </a>
          <button
            className="nav-burger"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(o => !o)}
          >
            {open ? <CloseIcon width={20} height={20} /> : <MenuIcon width={20} height={20} />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" hidden={!open}>
        <div className="wrap">
          {NAV.map(n => <a key={n.href} href={n.href} onClick={close}>{n.label}</a>)}
          <a href={LINKS.github} {...ext} onClick={close} aria-label="Open GitHub profile">GitHub</a>
          <a href={LINKS.cv} download className="pill pill--primary" onClick={close} aria-label="Download CV">
            <span className="pill-sq" aria-hidden />Download CV
          </a>
        </div>
      </div>
    </header>
  )
}

// ─── 2. Hero ────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="wrap hero-inner">
        <Reveal>
          <div className="hero-badge">{HERO.intro}</div>
          <h1 className="hero-title">{HERO.title}<Cursor /></h1>
          <div className="hero-sub">
            {HERO.paragraphs.map(p => <p key={p}>{p}</p>)}
          </div>
          <div className="hero-status"><span className="live-dot" />{HERO.status}</div>
          <div className="hero-cta">
            <a href="#projects" className="pill pill--primary"><span className="pill-sq" aria-hidden />View projects</a>
            <CvPill />
          </div>
          <div className="hero-socials">
            <a href={LINKS.github} {...ext} aria-label="Open GitHub profile"><GitHubIcon width={14} height={14} />GitHub</a>
            <a href={LINKS.linkedin} {...ext}><LinkedInIcon width={14} height={14} />LinkedIn</a>
            <a href={LINKS.email}><MailIcon width={14} height={14} />Email</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <HeroPanels />
        </Reveal>
      </div>
    </section>
  )
}

// ─── 3. About ───────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="about" className="statement">
      <div className="wrap about-grid">
        <Reveal><h2 className="h2">{ABOUT.heading}<Cursor /></h2></Reveal>
        <Reveal className="about-text" delay={80}>
          {ABOUT.paragraphs.map((p, i) => <p key={p} className={i === 0 ? 'hl' : undefined}>{p}</p>)}
        </Reveal>
      </div>
    </section>
  )
}

// ─── 4. Projects ────────────────────────────────────────────────────────────

function ProjectLinks({ p }: { p: Project }) {
  const links = p.links ?? [{ label: 'Source code', href: p.github }, ...(p.extra ? [p.extra] : [])]
  return (
    <>
      {links.map(l => (
        <a key={l.label} href={l.href} {...(isExternal(l.href) ? ext : {})} className="text-link">
          {l.label} <ArrowUpRight width={12} height={12} />
        </a>
      ))}
    </>
  )
}

function ExpandedDetails({ e }: { e: NonNullable<Project['expanded']> }) {
  return (
    <div className="proj-expanded">
      {e.paragraphs.map(t => <p key={t} className="bento-p">{t}</p>)}
      {e.components && (
        <>
          <h4 className="proj-h4">Main components</h4>
          <dl className="proj-components">
            {e.components.map(c => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.detail}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {e.technologies && (
        <>
          <h4 className="proj-h4">Technologies</h4>
          <dl className="proj-tech">
            {e.technologies.map(t => (
              <div key={t.label}>
                <dt>{t.label}</dt>
                <dd>{t.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      {e.status && <p className="proj-status"><span>Project status:</span> {e.status}</p>}
    </div>
  )
}

type BentoSize = 'wide' | 'narrow' | 'full'

function BentoCard({ p, size }: { p: Project; size: BentoSize }) {
  const [more, setMore] = useState(false)
  const all = paras(p.description)
  // With long-form `expanded` content the whole description stays visible and "Read more" reveals the extra;
  // otherwise only the first paragraph is shown and "Read more" reveals the rest.
  const visible = p.expanded ? all : all.slice(0, 1)
  const hidden = p.expanded ? [] : all.slice(1)
  const hasMore = Boolean(p.expanded) || hidden.length > 0
  return (
    <article className={`card bento-card bento-card--${size}`}>
      <ProjectVisual name={p.name} tag={p.tag} />
      <div className="bento-body">
        {p.category && <div className="bento-cat">{p.category}</div>}
        <h3 className="bento-title">{p.title ?? p.name}</h3>
        <div className="bento-meta">{p.tag}</div>
        <div className="bento-desc-wrap">
          {visible.map(t => <p key={t} className="bento-p bento-p--stack">{t}</p>)}
          {hasMore && (
            <div className={`bento-more${more ? ' is-open' : ''}`}>
              <div>
                {p.expanded
                  ? <ExpandedDetails e={p.expanded} />
                  : hidden.map(t => <p key={t} className="bento-p">{t}</p>)}
              </div>
            </div>
          )}
        </div>
        <div className="bento-links">
          {hasMore && (
            <button className="text-btn" onClick={() => setMore(m => !m)} aria-expanded={more}>
              {more ? 'Show less' : 'Read more'}
            </button>
          )}
          <ProjectLinks p={p} />
        </div>
      </div>
    </article>
  )
}

function SmallCard({ p }: { p: Project }) {
  return (
    <Reveal>
      <article className="card small-card">
        <ProjectVisual name={p.name} tag={p.tag} />
        {p.category && <div className="bento-cat">{p.category}</div>}
        <h3 className="bento-title">{p.title ?? p.name}</h3>
        <p className="bento-desc">{p.description}</p>
        <div className="bento-links">
          <a href={p.github} {...ext} className="text-link" aria-label="View source code">
            Source code <ArrowUpRight width={12} height={12} />
          </a>
        </div>
      </article>
    </Reveal>
  )
}

const BENTO_SIZES: BentoSize[] = ['wide', 'narrow', 'narrow', 'wide', 'full']

function Projects() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <Reveal className="section-head section-head--stack">
          <h2 className="h2">{PROJECTS_SECTION.heading}<Cursor /></h2>
          <p className="section-intro">{PROJECTS_SECTION.intro}</p>
        </Reveal>
        <div className="bento">
          {FEATURED_PROJECTS.map((p, i) => {
            const size = BENTO_SIZES[i % BENTO_SIZES.length]
            return (
              <Reveal key={p.name} delay={i * 60} className={`bento-cell bento-cell--${size}`}>
                <BentoCard p={p} size={size} />
              </Reveal>
            )
          })}
        </div>

        <Reveal className="other-head">
          <h3 className="h3">{OTHER_PROJECTS.heading}</h3>
          <p className="muted">{OTHER_PROJECTS.intro}</p>
        </Reveal>
        {expanded && (
          <div className="small-grid" id="more-projects">
            {EXTRA_PROJECTS.map(p => <SmallCard key={p.name} p={p} />)}
          </div>
        )}
        <div className="toggle-row">
          <button className="pill pill--secondary" onClick={() => setExpanded(e => !e)} aria-expanded={expanded} aria-controls="more-projects">
            <PlusIcon width={14} height={14} className={expanded ? 'rot45' : undefined} />
            {expanded ? 'Show fewer projects' : 'Show more projects'}
          </button>
          <a href={LINKS.github} {...ext} className="text-link" aria-label="Open GitHub profile">
            View all on GitHub <ArrowUpRight width={12} height={12} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── 5. What I work with (light section) ────────────────────────────────────

const AREA_ICON: Record<ExpertiseArea['key'], ReactNode> = {
  hpc: <ChipIcon width={22} height={22} />,
  cloud: <CloudIcon width={22} height={22} />,
  swe: <TerminalIcon width={22} height={22} />,
}

function AreaCard({ a }: { a: ExpertiseArea }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <article className={`lcard lcard--${a.key}`}>
      <div className="lcard-icon">{AREA_ICON[a.key]}</div>
      <h3 className="lcard-title">{a.title}</h3>
      <div className="lcard-text">
        {a.paragraphs.map((p, j) => <p key={p} className={j === 0 ? 'lcard-line' : 'lcard-p'}>{p}</p>)}
      </div>
      {a.items && (
        <ul className="lcard-list">
          {a.items.map((it, i) => {
            const isOpen = open === i
            const id = `${a.key}-${i}`
            return (
              <li key={it.label} className={isOpen ? 'is-open' : undefined}>
                <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={id}>
                  <span>{it.label}</span>
                  <ChevronIcon width={14} height={14} />
                </button>
                <div id={id} className="lcard-detail" role="region">
                  <p>{it.detail}</p>
                </div>
              </li>
            )
          })}
        </ul>
      )}
      {a.tools && (
        <div className="lcard-tools">
          {a.toolsLabel && <div className="lcard-tools-label">{a.toolsLabel}</div>}
          <div className="lcard-chips">{a.tools.map(t => <span key={t}>{t}</span>)}</div>
        </div>
      )}
    </article>
  )
}

function Expertise() {
  return (
    <section className="light" id="expertise">
      <div className="wrap">
        <Reveal className="light-head">
          <h2 className="h2">{EXPERTISE.heading}</h2>
          <p>{EXPERTISE.intro}</p>
        </Reveal>
        <div className="lcards">
          {EXPERTISE.areas.map((a, i) => (
            <Reveal key={a.key} delay={i * 80} className={`lcell lcell--${a.key}`}><AreaCard a={a} /></Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 6–7. Experience & education ────────────────────────────────────────────

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="timeline">
      {items.map((t, i) => (
        <li key={t.title}>
          <Reveal delay={i * 60}>
            <span className={`tl-node${i === 0 ? ' tl-node--on' : ''}`} aria-hidden />
            <h3 className="tl-title">{t.title}</h3>
            <div className="tl-org">{t.meta}</div>
            {t.paragraphs.map(p => <p key={p} className="tl-detail">{p}</p>)}
            {t.tech && <div className="tl-tech"><span>Technologies:</span> {t.tech}</div>}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

function Experience() {
  return (
    <section id="experience" className="section">
      <div className="wrap exp-grid">
        <Reveal className="exp-intro"><h2 className="h2">Experience<Cursor /></h2></Reveal>
        <Timeline items={EXPERIENCE} />
      </div>
    </section>
  )
}

function Education() {
  return (
    <section id="education" className="section section--flush">
      <div className="wrap exp-grid">
        <Reveal className="exp-intro"><h2 className="h2">Education</h2></Reveal>
        <Timeline items={EDUCATION} />
      </div>
    </section>
  )
}

// ─── 8. Certifications & achievements ───────────────────────────────────────

function Certifications() {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="section-head section-head--stack">
          <h2 className="h2">Certifications &amp; achievements</h2>
        </Reveal>
        <div className="certs">
          {CERTS.map((c, i) => {
            const inner = (
              <>
                <div className="cert-top">
                  <div className="cert-badge" aria-hidden><span className="sq" /></div>
                  {c.href && <ArrowUpRight width={14} height={14} className="cert-arrow" />}
                </div>
                <h3 className="cert-name">{c.name}</h3>
                {c.issuer && <div className="cert-issuer">{c.issuer}</div>}
                {c.paragraphs.map(p => <p key={p} className="cert-p">{p}</p>)}
              </>
            )
            return (
              <Reveal key={c.name} delay={i * 60}>
                {c.href
                  ? <a href={c.href} {...ext} className="card cert">{inner}</a>
                  : <div className="card cert">{inner}</div>}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── 9. Writing & reports ───────────────────────────────────────────────────

function Writing() {
  return (
    <section id="writing" className="section">
      <div className="wrap">
        <Reveal className="section-head section-head--stack">
          <h2 className="h2">{WRITING.heading}<Cursor /></h2>
          {WRITING.intro.map(p => <p key={p} className="section-intro">{p}</p>)}
        </Reveal>
        <div className="wcards">
          {WRITING.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 60}>
              <div className="card wcard">
                <h3 className="wcard-title">{c.title}</h3>
                {c.paragraphs.map(p => <p key={p} className="wcard-p">{p}</p>)}
                {c.title === 'Articles' && POSTS.length > 0 && (
                  <ul className="wcard-posts">
                    {POSTS.map(post => (
                      <li key={post.title}>
                        <a href={post.href} {...ext}>
                          <span className="wcard-post-title">{post.title}</span>
                          <span className="wcard-post-meta">{post.date} · {post.readTime}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                <a href={c.link.href} {...(isExternal(c.link.href) ? ext : {})} className="text-link wcard-link">
                  {c.title === 'Substack' && <SubstackIcon width={12} height={12} />}
                  {c.link.label} <ArrowUpRight width={12} height={12} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <ul className="reports" id="reports">
          {REPORTS.map(r => (
            <li key={r.title}>
              <a href={r.href} {...ext} className="report">
                <span className="report-badge">{r.badge}</span>
                <span className="report-main">
                  <span className="report-title">{r.title}</span>
                  <span className="report-desc">{r.description}</span>
                </span>
                <span className="report-meta">{r.meta.replace(' · view →', '')}</span>
                <span className="report-action">Read report <ArrowUpRight width={12} height={12} /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── 10. FAQ ────────────────────────────────────────────────────────────────

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="section">
      <div className="wrap faq-grid">
        <Reveal><h2 className="h2">FAQ</h2></Reveal>
        <Reveal delay={80}>
          <ul className="faq">
            {FAQ.map((f, i) => {
              const isOpen = open === i
              return (
                <li key={f.q} className={isOpen ? 'is-open' : undefined}>
                  <button onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} aria-controls={`faq-${i}`}>
                    <PlusIcon width={16} height={16} className="faq-icon" />
                    <span>{f.q}</span>
                  </button>
                  <div id={`faq-${i}`} className="faq-a" role="region">
                    <div>{f.a.map(p => <p key={p}>{p}</p>)}</div>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

// ─── 11. Contact ────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="cta">
      <div className="cta-glow" aria-hidden />
      <div className="wrap">
        <Reveal>
          <h2 className="cta-title">{CONTACT.heading}<Cursor /></h2>
          {CONTACT.paragraphs.map(p => <p key={p} className="cta-sub">{p}</p>)}
          <div className="hero-cta hero-cta--left">
            <a href={LINKS.email} className="pill pill--primary"><span className="pill-sq" aria-hidden />Email me</a>
            <a href={LINKS.linkedin} {...ext} className="pill pill--secondary"><LinkedInIcon width={14} height={14} />LinkedIn</a>
            <CvPill />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── 12. Footer ─────────────────────────────────────────────────────────────

function Footer() {
  const elsewhere = [
    { label: 'GitHub', href: LINKS.github, icon: <GitHubIcon width={14} height={14} />, external: true, aria: 'Open GitHub profile' },
    { label: 'LinkedIn', href: LINKS.linkedin, icon: <LinkedInIcon width={14} height={14} />, external: true },
    { label: 'Substack', href: LINKS.substack, icon: <SubstackIcon width={14} height={14} />, external: true },
    { label: 'Email', href: LINKS.email, icon: <MailIcon width={14} height={14} />, external: false },
  ]
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#top" className="logo" aria-label="Back to top">{NAME}<Cursor /></a>
            <p className="footer-title">{FOOTER.title}</p>
            <p className="muted">{FOOTER.location}</p>
          </div>
          <div className="footer-cols">
            <div>
              <h4>Navigation</h4>
              <ul>{NAV.map(n => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}</ul>
            </div>
            <div>
              <h4>Elsewhere</h4>
              <ul>
                {elsewhere.map(l => (
                  <li key={l.label}>
                    <a href={l.href} {...(l.external ? ext : {})} {...(l.aria ? { 'aria-label': l.aria } : {})}>
                      {l.icon}{l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {NAME}</span>
          <a href="#top" className="text-link">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
