// Small decorative visual at the top of each project card, keyed by project name.

function Ubcl() {
  return (
    <div className="viz viz-flow">
      <div className="viz-box is-on">
        <span className="viz-box-label">Transport implementation</span>
        <span className="viz-box-sub">libfabric</span>
      </div>
      <div className="viz-link" aria-hidden />
      <div className="viz-box">
        <span className="viz-box-label">Supported interconnects</span>
        <span className="viz-chips"><span>BXI</span><span>InfiniBand</span></span>
      </div>
      <div className="viz-foot">
        <span className="viz-pass">Communication benchmarks</span>
        <span>BXI / InfiniBand</span>
      </div>
    </div>
  )
}

function Speedup() {
  return (
    <div className="viz viz-speedup">
      <div className="viz-speedup-big">
        <span className="viz-cap">Speedup</span>
        ~1,000<span className="viz-x">×</span>
      </div>
      <div className="viz-speedup-bars">
        <div className="viz-sbar">
          <span className="viz-sbar-label">Original runtime</span>
          <span className="viz-sbar-track"><span style={{ width: '100%' }} /></span>
          <span className="viz-sbar-val">904 s</span>
        </div>
        <div className="viz-sbar is-best">
          <span className="viz-sbar-label">Optimised runtime</span>
          <span className="viz-sbar-track"><span style={{ width: '1.2%' }} /></span>
          <span className="viz-sbar-val">0.87 s</span>
        </div>
        <span className="viz-cap">Benchmark results</span>
      </div>
    </div>
  )
}

function Features({ items }: { items: string[] }) {
  return (
    <div className="viz viz-features">
      {items.map(i => (
        <span key={i} className="viz-feature"><span className="sq" />{i}</span>
      ))}
    </div>
  )
}

function Architecture() {
  return (
    <div className="viz viz-arch">
      <span className="viz-cap">Application architecture</span>
      <div className="viz-arch-row">
        <span className="viz-box">Backend API</span>
        <span className="viz-arrow">→</span>
        <span className="viz-box is-on">Vehicle state management</span>
        <span className="viz-arrow">→</span>
        <span className="viz-box">Database</span>
      </div>
    </div>
  )
}

function Soldini() {
  const steps = ['Transaction processing', 'Accounting and reconciliation', 'Fraud detection', 'Liquidity monitoring']
  return (
    <div className="viz viz-soldini">
      <div className="viz-pipeline">
        {steps.map((s, i) => (
          <span key={s} className="viz-state-wrap">
            <span className={`viz-box${i === 1 ? ' is-on' : ''}`}>{s}</span>
            {i < steps.length - 1 && <span className="viz-arrow" aria-hidden>→</span>}
          </span>
        ))}
      </div>
      <div className="viz-foot">
        <span>Teller application</span>
        <span className="viz-chips"><span>Français</span><span lang="ar" dir="rtl">العربية</span></span>
      </div>
    </div>
  )
}

function Tags({ tag }: { tag: string }) {
  return (
    <div className="viz viz-tags">
      {tag.split('·').map(t => <span key={t}>{t.trim()}</span>)}
    </div>
  )
}

export default function ProjectVisual({ name, tag }: { name: string; tag: string }) {
  switch (name) {
    case 'open-source-ubcl': return <Ubcl />
    case 'teratec-2025': return <Speedup />
    case 'redis-clone': return <Features items={['RESP protocol', 'Event-driven networking', 'Key expiration', 'Persistence']} />
    case 'fleet-management-os': return <Architecture />
    case 'soldini': return <Soldini />
    default: return <Tags tag={tag} />
  }
}
