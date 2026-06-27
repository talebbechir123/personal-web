import { useEffect, useState } from 'react'
import './App.css'

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('atb-portfolio-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved !== null ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [])

  function toggleTheme() {
    setDark(prev => {
      const next = !prev
      localStorage.setItem('atb-portfolio-theme', next ? 'dark' : 'light')
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <>
      <Nav dark={dark} toggleTheme={toggleTheme} />
      <main className="container">
        <Hero />
        <About />
        <Stack />
        <Projects />
        <Reports />
        <Writing />
        <Contact />
      </main>
    </>
  )
}

function Nav({ dark, toggleTheme }: { dark: boolean; toggleTheme: () => void }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a href="#hero" className="nav-logo">
          atb<span className="accent">_</span>
        </a>
        <nav className="nav-links">
          <a href="#about" className="nav-link">about</a>
          <a href="#work" className="nav-link">work</a>
          <a href="#reports" className="nav-link">reports</a>
          <a href="#writing" className="nav-link">writing</a>
          <button onClick={toggleTheme} className="nav-link theme-btn">
            {dark ? '☀ light' : '◑ dark'}
          </button>
          <a href="#contact" className="btn-primary nav-contact">contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="eyebrow">systems / cloud / backend</div>
      <h1 className="hero-name">
        Ahmed<br />Taleb Bechir
      </h1>
      <p className="hero-tagline">
        HPC systems engineer. Backend at scale. Cloud and devops.<br />
        Building reliable infrastructure from kernel space to cloud orchestration.
      </p>
      <div className="hero-cta">
        <a href="#work" className="btn-primary">view work →</a>
        <a href="https://github.com/talebbechir123" target="_blank" rel="noreferrer" className="btn-ghost">github ↗</a>
        <a href="https://substack.com/@atalebbechir" target="_blank" rel="noreferrer" className="btn-ghost">substack ↗</a>
      </div>
      <div className="availability">
        <span className="availability-dot" />
        <span className="availability-text">open to new opportunities</span>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section">
      <div className="eyebrow">01 — about</div>
      <div className="about-grid">
        <div className="about-bio">
          <p className="body-sm">
            I work across the stack, from systems programming in C to cloud deployment on GCP.
            I care about writing correct, efficient code and understanding how things work at
            every layer. Currently looking for my first full-time role in HPC, systems, or
            software engineering.
          </p>
        </div>
        <div className="about-meta">
          <InfoBlock label="focus" value={['HPC · Systems Engineering', 'Cloud / DevOps · Backend']} />
          <InfoBlock label="currently" value={['Open to opportunities · 2026']} />
          <InfoBlock label="education" value={['M2 MSCHP — ENS Paris-Saclay']} />
        </div>
      </div>
    </section>
  )
}

function InfoBlock({ label, value }: { label: string; value: string[] }) {
  return (
    <div className="info-block">
      <div className="meta-label">{label}</div>
      {value.map(v => (
        <div key={v} className="meta-value">{v}</div>
      ))}
    </div>
  )
}

function Stack() {
  const cols = [
    { header: 'Languages', items: ['C', 'C++', 'TypeScript', 'Python', 'Bash'] },
    { header: 'Backend', items: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'MPI / OpenMP'] },
    { header: 'Infrastructure', items: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Slurm'] },
    { header: 'Cloud / OS', items: ['GCP', 'Linux', 'libfabric', 'RDMA', 'Observability'] },
  ]
  return (
    <section id="stack" className="section">
      <div className="eyebrow">02 — stack</div>
      <div className="stack-grid">
        {cols.map(col => (
          <div key={col.header} className="stack-col">
            <div className="stack-header">{col.header}</div>
            <div className="stack-items">
              {col.items.map(item => (
                <span key={item} className="stack-item">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

interface Project {
  name: string
  tag: string
  description: string
  github: string
  extra?: { label: string; href: string }
}

const FEATURED_PROJECTS: Project[] = [
  {
    name: 'open-source-ubcl',
    tag: 'C · MPI · libfabric',
    description:
      'R&D internship at Eviden. Designed and implemented a full libfabric/OFI-based transport for UBCL, Eviden\'s HPC communication library, decoupling it from their proprietary BXI network so the open-source community can test and contribute to Open MPI\'s UBCL components on standard interconnects for the first time. Covers non-blocking send/receive with a custom 64-bit tag encoding, wildcard matching, a completion-queue-driven progress engine, probe operations, and pack/unpack helpers for arbitrary buffer layouts. Validated with OSU Micro-Benchmarks across BXI, TCP, UDP, and InfiniBand verbs.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'redis-clone',
    tag: 'C · epoll · RESP',
    description:
      'Redis-compatible in-memory key-value server in C. Implements the RESP protocol for full compatibility with redis-cli and standard Redis client libraries. Built on an epoll-based event loop in edge-triggered mode for O(1) connection dispatch, handling thousands of concurrent connections without shared global state. Includes FNV-1a hashing, two-tier TTL expiration combining lazy eviction with an active background sweep, and snapshot-based persistence with automatic restore on startup.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'fleet-management-os',
    tag: 'TypeScript · GCP · K8s',
    description:
      'Full-stack fleet management platform built end-to-end in TypeScript. Express/Node.js REST API with Zod validation, React frontend with React Query for server state, MongoDB Atlas with Mongoose ODM. Domain logic includes a vehicle status state machine with enforced transitions and maintenance scheduling with interval overlap conflict detection using compound indexing. Deployed on Google Cloud Run via multi-stage Docker build, frontend on GitHub Pages via GitHub Actions, with Kubernetes manifests and liveness/readiness health probes.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'teratec-2025',
    tag: 'C++ · OpenMP · SIMD/NEON',
    description:
      '1000x speedup (904s → 0.87s) on a Black-Scholes Monte Carlo options pricer in C++ targeting ARM Graviton 4 at the Teratec 2025 hackathon. Profiled with Linux perf and flamegraphs to identify hotspots, then applied OpenMP parallelization and manual SIMD vectorization using NEON intrinsics and ACFL compiler flags, with each pass guided by the profiler output. Also worked on porting Code_Aster, a large-scale structural analysis solver, to ARM architecture.',
    github: 'https://github.com/talebbechir123',
  },
]

const EXTRA_PROJECTS: Project[] = [
  {
    name: 'gcp-iac',
    tag: 'GCP · Terraform · Docker',
    description:
      'Deployed C++ and Python applications including a RAG FastAPI/Vertex AI service on Google Cloud Run, containerized with Docker and delivered via Cloud Build CI/CD pipelines. Provisioned reproducible GCP infrastructure with Terraform, resolving complex Alpine/vcpkg/CMake multi-stage build conflicts to produce lightweight, reliable container images.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'saboteur-online',
    tag: 'Node.js · Socket.IO · MongoDB',
    description:
      'Real-time multiplayer adaptation of the Saboteur card game, built with a team of 11. Owned the backend API, database design, and networking layer. REST API handles lobby management, authentication, and matchmaking; a Socket.IO WebSocket layer manages in-game state synchronization with hidden-information partitioning per player. Containerized with Docker, load-tested with Artillery, and documented with OpenAPI/Swagger.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'domain-decomposition-methods',
    tag: 'Python · Numerical Methods · HPC',
    description:
      'End-to-end Python implementation of primal and dual domain decomposition approaches for a linear elasticity problem, including BDD with a Neumann preconditioner and FETI with a Dirichlet preconditioner, rigid body modes, and a coarse problem. Numerical scalability analysis tracking Schur complement conditioning as a function of h/H and number of subdomains. Both methods achieved optimal convergence in zero iterations on the 1D validation case, against linear iteration growth for unpreconditioned CG.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'parallel-genetic-autotuner',
    tag: 'C++ · MPI · OpenMP',
    description:
      'Parallel genetic algorithm in C++ using MPI and OpenMP to automatically optimize external programs over large search spaces of compiler flags and runtime parameters. Fitness evaluations distributed across MPI ranks, with custom selection, crossover, and mutation operators designed for the auto-tuning use case.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'openfoam-cylinder-cfd',
    tag: 'OpenFOAM · Python · CFD',
    description:
      'Transient CFD simulations using pimpleFoam and icoFoam for Reynolds numbers from 50 to 1000, capturing vortex shedding behavior and computing drag and lift coefficients via functionObjects. Post-processed in ParaView and Python, comparing velocity and vorticity fields against reference values from literature across the full Re sweep.',
    github: 'https://github.com/talebbechir123',
  },
]

function ProjectCard({ name, tag, description, github, extra }: Project) {
  return (
    <div className="proj-card">
      <div className="proj-card-header">
        <span className="proj-name">{name}</span>
        <span className="proj-tag">{tag}</span>
      </div>
      <p className="proj-desc">{description}</p>
      <div className="proj-links">
        <a href={github} target="_blank" rel="noreferrer" className="proj-link">github ↗</a>
        {extra && (
          <a href={extra.href} className="proj-link">{extra.label}</a>
        )}
      </div>
    </div>
  )
}

function Projects() {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded
    ? [...FEATURED_PROJECTS, ...EXTRA_PROJECTS]
    : FEATURED_PROJECTS

  return (
    <section id="work" className="section">
      <div className="section-header">
        <div className="eyebrow" style={{ marginBottom: 0 }}>03 — selected work</div>
        <a href="https://github.com/talebbechir123" target="_blank" rel="noreferrer" className="section-all-link">
          all on github ↗
        </a>
      </div>
      <div className="proj-list">
        {visible.map(p => (
          <ProjectCard key={p.name} {...p} />
        ))}
      </div>
      <button
        className="toggle-btn"
        onClick={() => setExpanded(e => !e)}
      >
        {expanded ? 'show less ↑' : `show all projects (${EXTRA_PROJECTS.length} more) ↓`}
      </button>
    </section>
  )
}

interface Report {
  title: string
  badge: 'PDF' | 'SLIDES'
  description: string
  meta: string
  href: string
}

const REPORTS: Report[] = [
  {
    title: 'Open Source UBCL — Internship Report',
    badge: 'PDF',
    description:
      'R&D internship at Eviden. Design and implementation of a libfabric/OFI-based transport for UBCL, validated across BXI and InfiniBand interconnects using OSU Micro-Benchmarks.',
    meta: 'Sep 2025 · view →',
    href: '/reports/ubcl_internship.pdf',
  },
  {
    title: 'Teratec 2025 — Black-Scholes Optimization & Code_Aster on ARM',
    badge: 'PDF',
    description:
      '1000x speedup on a Monte Carlo options pricer in C++ on ARM Graviton 4 via OpenMP and SIMD/NEON vectorization. Includes Code_Aster ARM porting work.',
    meta: 'Jun 2025 · view →',
    href: '/reports/Rapport___Hackathon___.pdf',
  },
  {
    title: 'Domain Decomposition Methods — Linear Elasticity',
    badge: 'PDF',
    description:
      'End-to-end implementation and scalability analysis of BDD and FETI preconditioned solvers for a linear elasticity problem, compared against unpreconditioned CG.',
    meta: '2025 · view →',
    href: '/reports/DDM_report__Copy_.pdf',
  },
  {
    title: 'Finite Element Analysis, Data Decomposition, and PGD Applications',
    badge: 'PDF',
    description:
      'Study of finite element methods, domain decomposition approaches, and Proper Generalized Decomposition applications.',
    meta: '2025 · view →',
    href: '/reports/Finite_Element_Analysis.pdf',
  },
  {
    title: 'Six-Bar Truss Analysis — ABAQUS',
    badge: 'PDF',
    description:
      '2D truss modeled in ABAQUS and solved analytically via manual 10×10 stiffness matrix assembly. Results agree within 0.2% across nodal displacements, reaction forces, and axial stresses.',
    meta: '2025 · view →',
    href: '/reports/MS.pdf',
  },
  {
    title: 'Flexible I/O Tester — Storage Benchmarking',
    badge: 'PDF',
    description:
      'Systematic characterization of storage subsystem bandwidth and IOPS by sweeping read/write ratios, block sizes from 1KB to 1MB, and parallel process counts.',
    meta: '2025 · view →',
    href: '/reports/io.pdf',
  },
  {
    title: 'Genetic Algorithm for Auto-Tuning — Slides',
    badge: 'SLIDES',
    description:
      'Presentation of a parallel genetic algorithm in C++ using MPI and OpenMP for automatic optimization of compiler flags and runtime parameters.',
    meta: '2025 · view →',
    href: '/reports/Presentation.pdf',
  },
  {
    title: 'Multi-Scale Methods & Mesh-Free Report',
    badge: 'PDF',
    description:
      'Study of multi-scale numerical methods and mesh-free approaches.',
    meta: '2025 · view →',
    href: '/reports/msmfreport.pdf',
  },
]
function Reports() {
  return (
    <section id="reports" className="section">
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div className="eyebrow" style={{ marginBottom: 0 }}>04 — technical reports</div>
      </div>
      <div className="report-list">
        {REPORTS.map(r => (
          <a key={r.title} href={r.href} className="report-card">
            <div className="report-card-header">
              <span className="report-title">{r.title}</span>
              <span className="report-badge">{r.badge}</span>
            </div>
            <p className="report-desc">{r.description}</p>
            <span className="report-meta">{r.meta}</span>
          </a>
        ))}
      </div>
    </section>
  )
}

interface Post {
  title: string
  readTime: string
  excerpt: string
  date: string
  href: string
  last?: boolean
}

const POSTS: Post[] = [
  {
    title: 'No clankers allowed',
    readTime: '6 min read',
    excerpt:
      'On AI layoffs, engineers without unions, and why the fear of Skynet got the villain wrong. The machine was never going to save us or damn us — a person always makes that call.',
    date: 'May 2026',
    href: 'https://atalebbechir.substack.com/p/no-clankers-allowed',
  },
]


function Writing() {
  return (
    <section id="writing" className="section">
      <div className="section-header">
        <div className="eyebrow" style={{ marginBottom: 0 }}>05 — writing</div>
        <a href="https://substack.com" target="_blank" rel="noreferrer" className="section-all-link">
          all posts on substack ↗
        </a>
      </div>
      <div className="post-list">
        {POSTS.map(post => (
          <a
            key={post.title}
            href={post.href}
            target="_blank"
            rel="noreferrer"
            className={`post-row${post.last ? ' post-row--last' : ''}`}
          >
            <div className="post-header">
              <span className="post-title">{post.title}</span>
              <span className="post-readtime">{post.readTime}</span>
            </div>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-footer">
              <span className="post-date">{post.date}</span>
              <span className="post-substack">substack ↗</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="eyebrow">06 — contact</div>
      <p className="contact-intro">
        Interested in working together? Reach out — I'm always
        open to interesting conversations.
      </p>
      <div className="contact-links">
        <a href="mailto:talebbechir123@gmail.com" className="btn-primary">email →</a>
        <a href="https://www.linkedin.com/in/ahmed-taleb-bechir-97a7301a4/" target="_blank" rel="noreferrer" className="icon-link">linkedin ↗</a>
        <a href="https://github.com/talebbechir123" target="_blank" rel="noreferrer" className="icon-link">github ↗</a>
        <a href="https://substack.com/@atalebbechir" target="_blank" rel="noreferrer" className="icon-link">substack ↗</a>
      </div>
      <footer className="footer">
        <span>Ahmed Taleb Bechir · 2026</span>
        <span>HPC systems / cloud / backend</span>
      </footer>
    </section>
  )
}