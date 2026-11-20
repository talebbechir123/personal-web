// ─────────────────────────────────────────────────────────────────────────────
// All site content lives here. Edit freely — components only read from this file.
// ─────────────────────────────────────────────────────────────────────────────

export const LINKS = {
  github: 'https://github.com/talebbechir123',
  linkedin: 'https://www.linkedin.com/in/ahmed-taleb-bechir-97a7301a4/',
  substack: 'https://substack.com/@atalebbechir',
  substackHome: 'https://atalebbechir.substack.com',
  email: 'mailto:talebbechir123@gmail.com',
  // CV lives in client/public/ — replace the file (same name) to update it
  cv: '/CV_bechir_ahmed_taleb_junior.pdf',
}

export const NAME = 'Ahmed Taleb Bechir'

// ─── Hero ───────────────────────────────────────────────────────────────────

export const HERO = {
  intro: NAME,
  title: 'HPC & Cloud Engineer',
  paragraphs: [
    "I'm interested in high-performance computing, cloud infrastructure and the systems behind them.",
    'My experience ranges from low-level communication libraries and parallel programming to cloud deployments and infrastructure automation. I enjoy understanding how things work, particularly when that means digging into the technical details.',
  ],
  status: 'Based in the Paris area, France · Open to full-time opportunities',
}

// ─── About ──────────────────────────────────────────────────────────────────

export const ABOUT = {
  heading: 'A little about me',
  paragraphs: [
    'I studied high-performance computing and numerical simulation at ENS Paris-Saclay, where I developed an interest in parallel programming, computer architecture and performance optimisation.',
    'During my internship at Eviden, I worked on communication software for HPC systems, developing a transport layer based on libfabric and testing it with BXI and InfiniBand interconnects.',
    "That experience made me particularly interested in the parts of computing that aren't always visible from the application level: how processes communicate, how data moves between machines, and how software interacts with the underlying hardware.",
    "I've also spent time exploring cloud infrastructure, deployment and backend development. I like being able to move between low-level programming and the infrastructure needed to run applications.",
    'Outside of formal work, I enjoy building projects to learn how different technologies work. Some are practical applications, while others are simply things I wanted to understand better.',
  ],
}

// ─── Projects ───────────────────────────────────────────────────────────────

export interface Project {
  /** short id — also picks the card visual */
  name: string
  /** display title (falls back to name) */
  title?: string
  /** category label shown above the title */
  category?: string
  /** technologies, separated by " · " */
  tag: string
  /** paragraphs separated by a blank line */
  description: string
  github: string
  /** explicit link list; if absent the card shows a single "Source code" link */
  links?: { label: string; href: string }[]
  extra?: { label: string; href: string }
  /**
   * Optional long-form content revealed by "Read more".
   * When present, the whole `description` stays visible on the card.
   */
  expanded?: {
    paragraphs: string[]
    components?: { label: string; detail: string }[]
    technologies?: { label: string; value: string }[]
    status?: string
  }
}

export const PROJECTS_SECTION = {
  heading: 'Selected projects',
  intro: "A few projects I've worked on, covering HPC communication, performance optimisation, backend development and infrastructure.",
}

// TODO: replace the GitHub profile URLs with each project's repository URL.
export const FEATURED_PROJECTS: Project[] = [
  {
    name: 'open-source-ubcl',
    title: 'UBCL: libfabric transport',
    category: 'High-Performance Computing',
    tag: 'C · libfabric · MPI · InfiniBand · BXI',
    description:
      'During my internship at Eviden, I worked on a libfabric-based transport layer for UBCL, a communication library used in HPC environments.\n\n' +
      'The aim was to support different network interconnects through a common communication interface. I worked on the implementation in C and tested the transport over BXI and InfiniBand.\n\n' +
      'A significant part of the work involved understanding how the underlying communication mechanisms behaved, debugging integration issues and validating the implementation with communication benchmarks.\n\n' +
      'This was my first experience working this closely with HPC interconnects, and it taught me a great deal about distributed communication and low-level systems programming.',
    github: 'https://github.com/talebbechir123',
    links: [
      { label: 'View project', href: 'https://github.com/talebbechir123' },
      { label: 'Technical report', href: '/reports/ubcl_internship.pdf' },
      // TODO: add { label: 'Source code', href: '...' } if the repository is public
    ],
  },
  {
    name: 'teratec-2025',
    title: 'Monte Carlo pricing optimisation',
    category: 'Performance Engineering · Teratec 2025',
    tag: 'C++ · OpenMP · SIMD/NEON · ARM Graviton4 · Linux perf',
    description:
      'At the Teratec 2025 hackathon, I worked on optimising a Monte Carlo pricing application on ARM Graviton4.\n\n' +
      'We started by profiling the application to identify where most of the execution time was being spent. From there, the work focused on improving the implementation through parallelisation, vectorisation and compiler optimisations.\n\n' +
      'In the measured benchmark, execution time went from 904 seconds to 0.87 seconds, an improvement of approximately 1,000×.\n\n' +
      'It was a good opportunity to see how much difference a combination of profiling and hardware-aware optimisation can make.',
    github: 'https://github.com/talebbechir123',
    links: [
      { label: 'View project', href: 'https://github.com/talebbechir123' },
      { label: 'Benchmark results', href: '/reports/Rapport___Hackathon___ExaTeam.pdf' }, // TODO: dedicated results link?
      { label: 'Technical report', href: '/reports/Rapport___Hackathon___ExaTeam.pdf' },
    ],
  },
  {
    name: 'redis-clone',
    title: 'Redis-compatible server',
    category: 'Systems Programming',
    tag: 'C · Linux · TCP · epoll · RESP',
    description:
      'I built a Redis-compatible server in C to better understand how in-memory data stores work.\n\n' +
      'The implementation includes the RESP protocol, command parsing, key expiration, persistence and an event loop based on Linux epoll to handle multiple client connections.\n\n' +
      "I was particularly interested in the networking side of the project: handling connections, processing commands and managing data without relying on a high-level framework.",
    github: 'https://github.com/talebbechir123',
    links: [
      { label: 'View source code', href: 'https://github.com/talebbechir123' },
    ],
  },
  {
    name: 'fleet-management-os',
    title: 'Fleet Management System',
    category: 'Software Development',
    tag: 'TypeScript · Node.js · Express · MongoDB',
    description:
      'A fleet management application built around vehicle tracking, availability and maintenance.\n\n' +
      'I worked on the backend APIs, data models and the logic used to manage changes in vehicle state.\n\n' +
      'The project involved designing REST endpoints, structuring application logic and working with MongoDB.',
    github: 'https://github.com/talebbechir123',
    links: [
      { label: 'View project', href: 'https://github.com/talebbechir123' },
      { label: 'Source code', href: 'https://github.com/talebbechir123' },
    ],
  },
  {
    name: 'soldini',
    title: 'Soldini — Mobile Money Agent Management',
    category: 'Cloud & Software Engineering',
    tag: 'Python · PostgreSQL · PostGIS · Docker · Google Cloud · Caddy',
    description:
      'Soldini is a platform I built to help mobile money agent network owners monitor transactions, reconcile cash balances and identify unusual activity across their locations.\n\n' +
      'It processes transaction statements from different providers, records operations in a double-entry ledger and compares expected cash balances against daily cash declarations. The application also includes rule-based fraud detection, a map showing liquidity across locations and a bilingual French/Arabic interface for tellers.\n\n' +
      'The application is deployed on Google Cloud. The source code is private.',
    github: '',
    links: [
      // TODO: add { label: 'Live demo', href: 'https://…' } if the demo is publicly accessible
    ],
    expanded: {
      paragraphs: [
        'I started Soldini to explore a problem faced by mobile money agent networks: keeping track of cash and transactions across multiple locations.',
        'An agent network can process thousands of operations through different mobile money providers, each with its own statement format. When records are managed manually, reconciling balances and finding discrepancies becomes difficult.',
        'I built Soldini to bring these operations into one system.',
        'The backend imports and normalises transaction statements before recording them in a double-entry ledger. A reconciliation process calculates the expected cash balance for each location and compares it with the amount declared by its teller.',
        'I also implemented eight fraud detection rules to identify patterns that may require investigation, such as repeated deposits to the same beneficiary.',
        'The dashboard brings together transaction history, reconciliation results, alerts and a map of agent locations showing their liquidity. Tellers use a separate mobile web interface to submit daily cash counts, with French and Arabic language support, including right-to-left layouts.',
        'For deployment, I used Docker Compose and Caddy on Google Cloud, with HTTPS and support for multiple tenants.',
        // Optional — uncomment only if these figures are approved for public disclosure:
        // 'During testing with real transaction data, Soldini reproduced an identified cash discrepancy to the exact amount. On a dataset of more than 6,000 operations, its detection rules generated 21 alerts.',
      ],
      components: [
        { label: 'Transaction processing', detail: 'Imports statements from multiple providers, handles differences in their formats and records the resulting transactions in a consistent data model.' },
        { label: 'Accounting and reconciliation', detail: 'A double-entry ledger tracks financial movements. Daily reconciliation compares expected and declared cash balances for each location.' },
        { label: 'Fraud detection', detail: 'Eight configurable rules examine transaction patterns and generate alerts for activity requiring review.' },
        { label: 'Liquidity monitoring', detail: 'PostgreSQL with PostGIS supports the location-based view of agent networks, including a map of available liquidity across points.' },
        { label: 'Teller application', detail: 'A mobile web application for entering daily cash counts, available in French and Arabic.' },
        { label: 'Deployment', detail: 'A multi-tenant demonstration environment hosted on Google Cloud, using Docker Compose, Caddy and HTTPS.' },
      ],
      technologies: [
        { label: 'Backend', value: 'Python' },
        { label: 'Database', value: 'PostgreSQL, PostGIS' },
        { label: 'Infrastructure', value: 'Google Cloud, Docker Compose, Caddy' },
        { label: 'Languages', value: 'French, Arabic (RTL)' },
        { label: 'Development workflow', value: 'Spec Kit, Claude Code' },
      ],
      status: 'Private repository',
    },
  },
]

export const OTHER_PROJECTS = {
  heading: 'Other projects',
  intro: "Smaller projects, experiments and applications I've built while learning or exploring different technologies.",
}

export const EXTRA_PROJECTS: Project[] = [
  {
    name: 'gcp-iac',
    category: 'Cloud & Infrastructure',
    tag: 'GCP · Terraform · Docker',
    description:
      'Deployed C++ and Python applications including a RAG FastAPI/Vertex AI service on Google Cloud Run, containerized with Docker and delivered via Cloud Build CI/CD pipelines. Provisioned reproducible GCP infrastructure with Terraform, resolving complex Alpine/vcpkg/CMake multi-stage build conflicts to produce lightweight, reliable container images.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'saboteur-online',
    category: 'Software Development',
    tag: 'Node.js · Socket.IO · MongoDB',
    description:
      'Real-time multiplayer adaptation of the Saboteur card game, built with a team of 11. Owned the backend API, database design, and networking layer. REST API handles lobby management, authentication, and matchmaking; a Socket.IO WebSocket layer manages in-game state synchronization with hidden-information partitioning per player. Containerized with Docker, load-tested with Artillery, and documented with OpenAPI/Swagger.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'domain-decomposition-methods',
    category: 'HPC',
    tag: 'Python · Numerical Methods · HPC',
    description:
      'End-to-end Python implementation of primal and dual domain decomposition approaches for a linear elasticity problem, including BDD with a Neumann preconditioner and FETI with a Dirichlet preconditioner, rigid body modes, and a coarse problem. Numerical scalability analysis tracking Schur complement conditioning as a function of h/H and number of subdomains. Both methods achieved optimal convergence in zero iterations on the 1D validation case, against linear iteration growth for unpreconditioned CG.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'parallel-genetic-autotuner',
    category: 'HPC',
    tag: 'C++ · MPI · OpenMP',
    description:
      'Parallel genetic algorithm in C++ using MPI and OpenMP to automatically optimize external programs over large search spaces of compiler flags and runtime parameters. Fitness evaluations distributed across MPI ranks, with custom selection, crossover, and mutation operators designed for the auto-tuning use case.',
    github: 'https://github.com/talebbechir123',
  },
  {
    name: 'openfoam-cylinder-cfd',
    category: 'HPC',
    tag: 'OpenFOAM · Python · CFD',
    description:
      'Transient CFD simulations using pimpleFoam and icoFoam for Reynolds numbers from 50 to 1000, capturing vortex shedding behavior and computing drag and lift coefficients via functionObjects. Post-processed in ParaView and Python, comparing velocity and vorticity fields against reference values from literature across the full Re sweep.',
    github: 'https://github.com/talebbechir123',
  },
]

// ─── Reports ────────────────────────────────────────────────────────────────

export interface Report {
  title: string
  badge: 'PDF' | 'SLIDES'
  description: string
  meta: string
  href: string
}

export const REPORTS: Report[] = [
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
    // fixed: previous href pointed at a file that doesn't exist in public/reports
    href: '/reports/Rapport___Hackathon___ExaTeam.pdf',
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

// ─── Posts ──────────────────────────────────────────────────────────────────

export interface Post {
  title: string
  readTime: string
  excerpt: string
  date: string
  href: string
  last?: boolean
}

export const POSTS: Post[] = [
  {
    title: 'No clankers allowed',
    readTime: '6 min read',
    excerpt:
      'On AI layoffs, engineers without unions, and why the fear of Skynet got the villain wrong. The machine was never going to save us or damn us — a person always makes that call.',
    date: 'May 2026',
    href: 'https://atalebbechir.substack.com/p/no-clankers-allowed',
  },
]

// ─── What I work with ───────────────────────────────────────────────────────

export interface ExpertiseArea {
  key: 'hpc' | 'cloud' | 'swe'
  title: string
  paragraphs: string[]
  items?: { label: string; detail: string }[]
  toolsLabel?: string
  tools?: string[]
}

export const EXPERTISE = {
  heading: 'What I work with',
  intro: 'Most of my work falls into two areas: high-performance computing and cloud infrastructure. I also use software development across both.',
  areas: [
    {
      key: 'hpc',
      title: 'High-Performance Computing',
      paragraphs: [
        'My HPC background comes from my studies in numerical simulation and my research internship at Eviden.',
        "I've worked with parallel programming, communication libraries and performance analysis, both in coursework and on real HPC systems.",
      ],
      items: [
        { label: 'Parallel programming', detail: 'MPI, OpenMP and C/C++ for parallel and distributed applications.' },
        { label: 'Communication and networking', detail: 'libfabric, InfiniBand, BXI, RDMA concepts and communication benchmarks.' },
        { label: 'Performance analysis', detail: 'Linux perf, flamegraphs, OSU Micro-Benchmarks, compiler optimisation and SIMD.' },
        { label: 'Numerical computing', detail: 'Finite element methods, domain decomposition, numerical modelling and simulation.' },
        { label: 'HPC environments', detail: 'Linux, Slurm, build systems and scientific computing workflows.' },
      ],
    },
    {
      key: 'cloud',
      title: 'Cloud & Infrastructure',
      paragraphs: [
        "Alongside HPC, I've worked with cloud platforms, containers and infrastructure automation.",
        'I enjoy the practical side of cloud engineering: configuring environments, deploying applications and understanding how the different services fit together.',
      ],
      items: [
        { label: 'Google Cloud', detail: 'Cloud Run, Cloud Build, Artifact Registry, GKE and other Google Cloud services.' },
        { label: 'Infrastructure as Code', detail: 'Terraform for provisioning and managing cloud resources.' },
        { label: 'Containers', detail: 'Docker, containerised application deployment and multi-stage builds.' },
        { label: 'Orchestration', detail: 'Kubernetes fundamentals, workloads, services and deployment configuration.' },
        { label: 'CI/CD', detail: 'GitHub Actions and Cloud Build for automated builds and deployments.' },
        { label: 'Cloud architecture', detail: 'Application deployment, infrastructure design, networking and operational considerations.' },
      ],
    },
    {
      key: 'swe',
      title: 'Software Development',
      paragraphs: [
        'Software development is a common part of my work in both HPC and cloud.',
        "I'm comfortable working in C/C++, Python and TypeScript, and have experience developing network applications, backend services and full-stack projects.",
        'I particularly enjoy projects where understanding the underlying system matters as much as implementing the application itself.',
      ],
      toolsLabel: 'Languages and tools',
      tools: ['C', 'C++', 'Python', 'TypeScript', 'Bash', 'SQL', 'Git', 'Linux'],
    },
  ] as ExpertiseArea[],
}

// ─── Experience & education ─────────────────────────────────────────────────

export interface TimelineItem {
  title: string
  meta: string
  paragraphs: string[]
  tech?: string
}

export const EXPERIENCE: TimelineItem[] = [
  {
    title: 'R&D Intern — HPC Communication Software',
    meta: 'Eviden (Bull) · 2025 · 6 months',
    paragraphs: [
      'I joined Eviden for a six-month R&D internship focused on communication software for high-performance computing.',
      'My main project was developing a libfabric-based transport layer for UBCL, with the aim of supporting different network interconnects.',
      'I worked on the implementation in C, integration with the existing communication software, debugging and validation on BXI and InfiniBand.',
      'The internship gave me hands-on experience with HPC communication libraries, network programming and development in a research environment.',
    ],
    tech: 'C, libfabric, MPI, InfiniBand, BXI, CMake, Linux',
  },
  {
    title: 'IT Intern',
    meta: 'Banque Populaire de Mauritanie · 2023',
    paragraphs: [
      'An internship that introduced me to IT operations and information systems in a banking environment.',
      'I had the opportunity to observe how enterprise IT systems are organised, maintained and supported, and to become more familiar with the operational side of IT.',
    ],
  },
]

export const EDUCATION: TimelineItem[] = [
  {
    title: "Master's degree — Modelling and Simulation for High-Performance Computing",
    meta: 'ENS Paris-Saclay · 2024–2025',
    paragraphs: [
      'Studies focused on high-performance computing, numerical simulation, parallel programming and scientific computing.',
      'Topics included numerical methods, parallel algorithms, performance optimisation and large-scale simulation.',
    ],
  },
  {
    title: "Master's first year — High-Performance Computing and Simulation",
    meta: 'Université Paris-Saclay · 2023–2024',
    paragraphs: ['Coursework in parallel programming, numerical methods, scientific computing and computer systems.'],
  },
  {
    title: "Bachelor's degree — Computer Science",
    meta: 'Université de Strasbourg · 2019–2023',
    paragraphs: ['Computer science fundamentals, including programming, algorithms, data structures, operating systems, networking and software development.'],
  },
]

// ─── Certifications & achievements ──────────────────────────────────────────

export interface Cert {
  name: string
  issuer?: string
  paragraphs: string[]
  href?: string
}

export const CERTS: Cert[] = [
  {
    name: 'Google Cloud — Associate Cloud Engineer',
    issuer: 'Google Cloud',
    paragraphs: ['Certification covering the deployment, configuration and management of applications and infrastructure on Google Cloud.'],
  },
  {
    name: 'FinOps Certification',
    paragraphs: ['Training and certification in cloud financial management, cost optimisation and the relationship between cloud usage and business requirements.'],
  },
  {
    name: 'Teratec 2025 — HPC Hackathon',
    paragraphs: [
      'Participated in a performance optimisation challenge on ARM Graviton4, working on a Monte Carlo pricing application.',
      'The project involved profiling, OpenMP parallelisation, SIMD vectorisation and compiler optimisation.',
    ],
    href: '/reports/Rapport___Hackathon___ExaTeam.pdf',
  },
]

// ─── Writing & reports ──────────────────────────────────────────────────────

export const WRITING = {
  heading: 'Writing & reports',
  intro: [
    "I sometimes write about projects I've worked on, technical problems I've encountered and topics I'm interested in learning more about.",
    'I also keep some of my academic and technical reports here, including work from my studies and internship.',
  ],
  cards: [
    {
      title: 'Articles',
      paragraphs: ['Notes on HPC, software development, cloud infrastructure and other topics I find interesting.'],
      link: { label: 'Read on Substack', href: 'https://substack.com/@atalebbechir' },
    },
    {
      title: 'Technical reports',
      paragraphs: [
        'Reports and project documentation from my studies, internship and other technical work.',
        'These cover subjects such as numerical methods, parallel computing, communication libraries and performance optimisation.',
      ],
      link: { label: 'Browse reports', href: '#reports' },
    },
    {
      title: 'Substack',
      paragraphs: ["I write occasionally about computing, engineering and things I've been exploring."],
      link: { label: 'atalebbechir.substack.com', href: 'https://atalebbechir.substack.com' },
    },
  ],
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

export const FAQ: { q: string; a: string[] }[] = [
  {
    q: 'Where are you based?',
    a: ["I'm based in the Paris area, France, and open to on-site or hybrid opportunities. I'm also open to discussing relocation."],
  },
  {
    q: 'What kind of roles are you interested in?',
    a: [
      "I'm looking for full-time opportunities in HPC and cloud engineering.",
      "I'm particularly interested in performance engineering, parallel computing, systems programming, cloud infrastructure and platform engineering.",
      "I'm also interested in software engineering roles involving C/C++, distributed systems or backend development.",
    ],
  },
  {
    q: 'What programming languages do you use?',
    a: ['I mainly work with C, C++, Python and TypeScript. I also use Bash and SQL.'],
  },
  {
    q: 'Do you work more with HPC or cloud?',
    a: [
      'Both are important parts of my technical background.',
      'My academic and research experience is more focused on HPC, especially parallel programming, communication libraries and numerical computing.',
      "Alongside that, I've developed my cloud skills through projects, certification and hands-on work with Google Cloud and infrastructure tools.",
    ],
  },
  {
    q: 'Where can I find your code and reports?',
    a: ["My public projects are available on GitHub, and I've linked my technical reports and articles in the Writing section."],
  },
]

// ─── Contact & footer ───────────────────────────────────────────────────────

export const CONTACT = {
  heading: 'Get in touch',
  paragraphs: [
    "I'm currently looking for full-time opportunities in HPC and cloud engineering.",
    "If you'd like to discuss a role, a project or something I've worked on, feel free to reach out.",
  ],
}

export const FOOTER = {
  title: 'HPC & Cloud Engineer',
  location: 'Paris area, France',
}
