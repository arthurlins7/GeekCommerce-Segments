'use client'

import { useState } from 'react'
import Link from 'next/link'
import { formatCurrency, PERSONA_CONFIG } from '../lib/utils'

interface SegmentResult {
  cluster: number
  persona: string
  acao: string
  metrica: string
  impacto_estimado: number
  recencia_media: number
  frequencia_media: number
  valor_medio: number
  qtd_clientes: number
}

const fields = [
  {
    key: 'recency' as const,
    label: 'Recência',
    sublabel: 'Dias desde a última compra',
    placeholder: '15',
    min: 0,
  },
  {
    key: 'frequency' as const,
    label: 'Frequência',
    sublabel: 'Número total de compras',
    placeholder: '8',
    min: 1,
  },
  {
    key: 'monetary' as const,
    label: 'Valor Monetário',
    sublabel: 'Total gasto em £ (libras)',
    placeholder: '2500',
    min: 0,
  },
]

export default function SimulatePage() {
  const [values, setValues] = useState({ recency: '', frequency: '', monetary: '' })
  const [result, setResult] = useState<SegmentResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSimulate() {
    if (!values.recency || !values.frequency || !values.monetary) {
      setError('Preencha todos os campos.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}/segments/predict`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            recency: parseFloat(values.recency),
            frequency: parseFloat(values.frequency),
            monetary: parseFloat(values.monetary),
          }),
        }
      )
      if (!res.ok) throw new Error('Erro na API')
      const data = await res.json()
      setResult(data)
    } catch {
      setError('Erro ao conectar com a API. Verifique se ela está rodando.')
    } finally {
      setLoading(false)
    }
  }

  const config = result
    ? PERSONA_CONFIG[result.persona] ?? { accentColor: '#64748b', priority: '', priorityNum: '' }
    : null

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Top accent line */}
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, #38bdf8 35%, #22c55e 65%, transparent 100%)' }} />

      <main style={{ maxWidth: 640, margin: '0 auto', padding: '56px 32px' }}>

        {/* Nav */}
        <Link
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontFamily: 'ui-monospace, monospace', color: 'var(--text-3)', textDecoration: 'none', marginBottom: 48 }}
        >
          ← Voltar
        </Link>

        {/* Header */}
        <header style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#38bdf8', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.2em', color: 'var(--text-3)', textTransform: 'uppercase' }}>
              Simulador · Predict
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text-1)', lineHeight: 1.1, marginBottom: 8 }}>
            Classificar Cliente
          </h1>
          <p style={{ color: 'var(--text-2)', fontSize: '0.875rem' }}>
            Insira os dados RFM para descobrir o segmento do cliente
          </p>
        </header>

        {/* Form */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: 28, marginBottom: 24 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 20 }}>
            {fields.map(({ key, label, sublabel, placeholder, min }) => (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: 8 }}>
                  <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', display: 'block', marginBottom: 2 }}>
                    {label}
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-3)', display: 'block' }}>
                    {sublabel}
                  </span>
                </label>
                <input
                  type="number"
                  min={min}
                  value={values[key]}
                  onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="rfm-input"
                />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 20 }} />

          {error && (
            <p style={{ fontSize: '0.8rem', color: '#f43f5e', fontFamily: 'ui-monospace, monospace', marginBottom: 14 }}>
              {error}
            </p>
          )}

          <button
            onClick={handleSimulate}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? 'var(--surface-2)' : '#0f1f3d',
              border: '1px solid',
              borderColor: loading ? 'var(--border)' : '#1e3a6e',
              borderRadius: 8,
              color: loading ? 'var(--text-3)' : '#38bdf8',
              fontSize: 13,
              fontFamily: 'ui-monospace, monospace',
              letterSpacing: '0.08em',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {loading ? 'Classificando...' : 'Executar Classificação →'}
          </button>
        </div>

        {/* Result */}
        {result && config && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: `3px solid ${config.accentColor}`,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            {/* Result header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                  Segmento identificado
                </span>
                <span style={{
                  fontSize: 10,
                  fontFamily: 'ui-monospace, monospace',
                  padding: '3px 8px',
                  borderRadius: 4,
                  border: `1px solid ${config.accentColor}40`,
                  background: `${config.accentColor}12`,
                  color: config.accentColor,
                }}>
                  {config.priorityNum} · {config.priority}
                </span>
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: config.accentColor, letterSpacing: '-0.02em' }}>
                {result.persona}
              </h2>
            </div>

            {/* Result body */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>

              <div style={{ background: 'var(--surface-2)', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                  Ação Recomendada
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', lineHeight: 1.65 }}>
                  {result.acao}
                </p>
              </div>

              <div style={{ background: 'var(--surface-2)', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                  Métrica de Sucesso
                </p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-1)', lineHeight: 1.65 }}>
                  {result.metrica}
                </p>
              </div>

              <div style={{ background: 'var(--surface-2)', borderRadius: 8, padding: '16px 18px' }}>
                <p style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 6 }}>
                  Impacto Financeiro Estimado
                </p>
                <p style={{ fontSize: '1.6rem', fontFamily: 'ui-monospace, monospace', fontWeight: 600, color: config.accentColor, letterSpacing: '-0.02em' }}>
                  {formatCurrency(result.impacto_estimado)}
                </p>
              </div>

              <Link
                href={`/segment/${encodeURIComponent(result.persona)}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 18px',
                  border: `1px solid ${config.accentColor}30`,
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontSize: 12,
                  fontFamily: 'ui-monospace, monospace',
                  color: config.accentColor,
                  transition: 'background 0.15s',
                }}
              >
                <span>Ver perfil completo do segmento</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
