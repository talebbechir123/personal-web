import { CheckIcon } from './Icons'

const STACK = [
  { name: 'C / C++', role: 'systems' },
  { name: 'MPI', role: 'distributed' },
  { name: 'OpenMP', role: 'shared-memory' },
  { name: 'Kubernetes', role: 'orchestration' },
  { name: 'Terraform', role: 'infra as code' },
  { name: 'GCP', role: 'cloud' },
]

// Only the real measured endpoints (904s → 0.87s); passes are listed without invented timings.
const PASSES = ['perf + flamegraph → hotspots', 'OpenMP parallel paths', 'NEON SIMD intrinsics', 'ACFL compiler flags']
const RUNS = [
  { label: 'baseline', time: '904 s', speed: '1x', pct: 100 },
  { label: 'optimised', time: '0.87 s', speed: '1000x', pct: 1.5 },
]

function StackPanel() {
  return (
    <div className="panel panel--stack">
      <div className="panel-head">
        <span>Toolchain</span>
        <span className="panel-head-meta">6 active</span>
      </div>
      <ul className="stack-rows">
        {STACK.map((s, i) => (
          <li key={s.name} className={i === 1 ? 'is-active' : undefined}>
            <span className="sq" />
            <span className="stack-name">{s.name}</span>
            <span className="stack-role">{s.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TerminalPanel() {
  return (
    <div className="panel panel--term">
      <div className="panel-head">
        <span className="dots"><i /><i /><i /></span>
        <span>pricer — benchmark</span>
        <span className="panel-head-meta">graviton4</span>
      </div>
      <div className="term-body">
        <div className="term-prompt">
          <span className="term-dim">$</span> ./bench.sh pricer
        </div>
        <div className="term-dim">black-scholes · monte carlo · c++</div>
        <ul className="term-passes">
          {PASSES.map(p => (
            <li key={p}><span className="term-green">✓</span> {p}</li>
          ))}
        </ul>
        <div className="term-runs">
          {RUNS.map((r, i) => (
            <div key={r.label} className={`term-run${i === RUNS.length - 1 ? ' is-best' : ''}`}>
              <span className="term-label">{r.label}</span>
              <span className="term-bar"><span style={{ width: `${r.pct}%` }} /></span>
              <span className="term-time">{r.time}</span>
              <span className="term-speed">{r.speed}</span>
            </div>
          ))}
        </div>
        <div className="term-ok">
          <span className="term-green">✓</span> 904s → 0.87s · Teratec 2025
          <span className="cursor cursor--term" aria-hidden />
        </div>
      </div>
    </div>
  )
}

function DeployPanel() {
  const steps = [
    'Building image (multi-stage)',
    'Pushing to Artifact Registry',
    'Creating revision atb-portfolio-00012',
    'Routing traffic · 100%',
  ]
  return (
    <div className="panel panel--deploy">
      <div className="panel-head">
        <span className="live-dot" />
        <span>atb-portfolio</span>
        <span className="panel-head-meta">europe-west1</span>
      </div>
      <ul className="deploy-steps">
        {steps.map(s => (
          <li key={s}>
            <CheckIcon width={13} height={13} className="term-green" />
            <span>{s}</span>
          </li>
        ))}
      </ul>
      <div className="deploy-ok">
        <span className="term-green">Cloud Run deploy succeeded</span>
      </div>
      <div className="deploy-foot">
        <span>▾ Logs</span>
        <span className="term-dim">gcr · cloudbuild</span>
      </div>
    </div>
  )
}

export default function HeroPanels() {
  return (
    <div className="hero-panels" aria-hidden>
      <StackPanel />
      <TerminalPanel />
      <DeployPanel />
    </div>
  )
}
