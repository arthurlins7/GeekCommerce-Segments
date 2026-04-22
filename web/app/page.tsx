import Link from 'next/link'
import { getSummary } from './lib/api'
import { formatCurrency, formatNumber, PERSONA_CONFIG } from './lib/utils'

export default async function Home() {
  const summary = await getSummary()

  const kpis = [
    { label: 'Faturamento Total', value: formatCurrency(summary.faturamento_total) },
    { label: 'Potencial Incremental', value: formatCurrency(summary.potencial_incremental) },
    { label: 'Upside Estimado', value: `+${summary.upside_percentual}%` },
    { label: 'Clientes Analisados', value: formatNumber(summary.total_clientes) },
  ]

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Top accent line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, #38bdf8 35%, #22c55e 65%, transparent 100%)' }} />

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 32px' }}>

        {/* Header */}
        <header style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase' }}>
              GeekCommerce · RFM Analysis
            </span>
          </div>
          <h1 style={{ fontSize: '2.6rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.1, marginBottom: 10 }}>
            Segmentação de Clientes
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>
            K-Means Clustering · {formatNumber(summary.total_clientes)} clientes analisados
          </p>
        </header>

        {/* KPI Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 12, overflow: 'hidden', marginBottom: 52 }}>
          {kpis.map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--surface)', padding: '20px 24px' }}>
              <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 8 }}>
                {label}
              </p>
              <p style={{ fontSize: '1.45rem', fontFamily: 'ui-monospace, monospace', fontWeight: 500, color: 'var(--text-1)', letterSpacing: '-0.02em' }}>
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', flexShrink: 0 }}>
            Segmentos
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', color: 'var(--text-3)', flexShrink: 0 }}>
            {summary.segmentos.length} clusters
          </span>
        </div>

        {/* Segment cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 52 }}>
          {summary.segmentos.map((seg) => {
            const config = PERSONA_CONFIG[seg.persona] ?? { accentColor: '#64748b', priority: '', priorityNum: '' }
            return (
              <Link
                key={seg.cluster}
                href={`/segment/${encodeURIComponent(seg.persona)}`}
                className="seg-card"
                style={{
                  display: 'block',
                  background: 'var(--surface)',
                  borderRadius: 10,
                  border: '1px solid var(--border)',
                  borderLeft: `3px solid ${config.accentColor}`,
                  padding: '24px 26px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                {/* Card header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.3 }}>
                    {seg.persona}
                  </h3>
                  <span style={{
                    fontSize: 10,
                    fontFamily: 'ui-monospace, monospace',
                    padding: '3px 8px',
                    borderRadius: 4,
                    border: `1px solid ${config.accentColor}40`,
                    background: `${config.accentColor}12`,
                    color: config.accentColor,
                    flexShrink: 0,
                    marginLeft: 12,
                  }}>
                    {config.priorityNum}
                  </span>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--border)', marginBottom: 18 }} />

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 18 }}>
                  <div>
                    <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>
                      Clientes
                    </p>
                    <p style={{ fontSize: '1.2rem', fontFamily: 'ui-monospace, monospace', color: 'var(--text-1)' }}>
                      {formatNumber(seg.qtd_clientes)}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 4 }}>
                      Impacto Est.
                    </p>
                    <p style={{ fontSize: '1.2rem', fontFamily: 'ui-monospace, monospace', color: config.accentColor }}>
                      {formatCurrency(seg.impacto_estimado)}
                    </p>
                  </div>
                </div>

                {/* Action text */}
                <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {seg.acao}
                </p>

                {/* CTA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontFamily: 'ui-monospace, monospace', color: 'var(--text-3)' }}>
                  <span>Ver análise completa</span>
                  <span>→</span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Simulator link */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-3)', fontFamily: 'ui-monospace, monospace' }}>
            Classifique um cliente individualmente pelo modelo treinado
          </p>
          <Link
            href="/simulate"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'var(--surface)',
              border: '1px solid var(--border-hover)',
              borderRadius: 8,
              padding: '9px 18px',
              fontSize: 12,
              fontFamily: 'ui-monospace, monospace',
              color: 'var(--text-2)',
              textDecoration: 'none',
              transition: 'border-color 0.15s, color 0.15s',
            }}
          >
            Classificar cliente
            <span>→</span>
          </Link>
        </div>

      </main>
    </div>
  )
}
