import Link from 'next/link'
import { getSummary } from '../../lib/api'
import { formatCurrency, formatNumber, PERSONA_CONFIG } from '../../lib/utils'
import { notFound } from 'next/navigation'

export default async function SegmentPage({
  params,
}: {
  params: Promise<{ persona: string }>
}) {
  const { persona } = await params
  const decodedPersona = decodeURIComponent(persona)
  const summary = await getSummary()
  const seg = summary.segmentos.find(s => s.persona === decodedPersona)

  if (!seg) notFound()

  const config = PERSONA_CONFIG[seg.persona] ?? { accentColor: '#64748b', priority: '', priorityNum: '' }

  const rfmMetrics = [
    { label: 'Recência Média', value: `${seg.recencia_media}`, unit: 'dias', desc: 'desde a última compra' },
    { label: 'Frequência Média', value: seg.frequencia_media.toFixed(1), unit: 'compras', desc: 'por cliente' },
    { label: 'Valor Médio', value: formatCurrency(seg.valor_medio), unit: '', desc: 'ticket médio' },
  ]

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Top accent line */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${config.accentColor}80 40%, ${config.accentColor} 50%, ${config.accentColor}80 60%, transparent 100%)` }} />

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '56px 32px' }}>

        {/* Nav */}
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'ui-monospace, monospace', color: 'var(--text-3)', textDecoration: 'none', marginBottom: 48 }}
        >
          ← Segmentos
        </Link>

        {/* Segment header card */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: `3px solid ${config.accentColor}`,
          borderRadius: 12,
          padding: '28px 32px',
          marginBottom: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 10 }}>
                Segmento de Clientes
              </span>
              <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: config.accentColor, lineHeight: 1.1, marginBottom: 8 }}>
                {seg.persona}
              </h1>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-2)' }}>
                {formatNumber(seg.qtd_clientes)} clientes neste segmento
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{
                display: 'inline-block',
                fontSize: 11,
                fontFamily: 'ui-monospace, monospace',
                padding: '5px 12px',
                borderRadius: 6,
                border: `1px solid ${config.accentColor}40`,
                background: `${config.accentColor}12`,
                color: config.accentColor,
              }}>
                {config.priorityNum} · {config.priority}
              </span>
            </div>
          </div>
        </div>

        {/* RFM metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', flexShrink: 0 }}>
            Perfil RFM
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 40 }}>
          {rfmMetrics.map(({ label, value, unit, desc }) => (
            <div key={label} style={{ background: 'var(--surface)', padding: '20px 22px' }}>
              <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                {label}
              </p>
              <p style={{ fontSize: '1.5rem', fontFamily: 'ui-monospace, monospace', fontWeight: 500, color: config.accentColor, letterSpacing: '-0.02em', marginBottom: 2 }}>
                {value}{unit ? <span style={{ fontSize: '0.8rem', color: 'var(--text-3)', marginLeft: 4 }}>{unit}</span> : null}
              </p>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-3)', fontFamily: 'ui-monospace, monospace' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Playbook */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', flexShrink: 0 }}>
            Playbook de Campanha
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px' }}>
            <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 10 }}>
              Ação Recomendada
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-1)', lineHeight: 1.7 }}>{seg.acao}</p>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px' }}>
            <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 10 }}>
              Métrica de Sucesso
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-1)', lineHeight: 1.7 }}>{seg.metrica}</p>
          </div>
        </div>

        {/* Impact */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-3)', flexShrink: 0 }}>
            Impacto Financeiro Estimado
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderLeft: `3px solid ${config.accentColor}`,
          borderRadius: 10,
          padding: '24px 28px',
        }}>
          <p style={{ fontSize: '2.5rem', fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: config.accentColor, letterSpacing: '-0.03em', marginBottom: 6 }}>
            {formatCurrency(seg.impacto_estimado)}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>
            potencial incremental com execução da campanha
          </p>
        </div>

      </main>
    </div>
  )
}
