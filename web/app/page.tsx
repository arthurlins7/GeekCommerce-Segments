import Link from 'next/link'
import { getSummary } from './lib/api'
import { formatCurrency, formatNumber, PERSONA_CONFIG } from './lib/utils'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Home() {
  let summary
  try {
    summary = await getSummary()
  } catch {
    return (
      <main className="min-h-screen p-8 max-w-6xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 text-sm mb-2">Aguardando API inicializar...</p>
          <p className="text-slate-600 text-xs">O servidor pode levar até 50s para acordar no plano gratuito.</p>
          <a href="/" className="mt-4 inline-block text-blue-400 text-sm hover:underline">Tentar novamente →</a>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-widest text-slate-500 uppercase mb-1">GeekCommerce</p>
        <h1 className="text-3xl font-bold text-white">Segmentação de Clientes</h1>
        <p className="text-slate-400 mt-1">RFM + K-Means Clustering · {formatNumber(summary.total_clientes)} clientes analisados</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Faturamento Total', value: formatCurrency(summary.faturamento_total) },
          { label: 'Potencial Incremental', value: formatCurrency(summary.potencial_incremental) },
          { label: 'Upside Estimado', value: `${summary.upside_percentual}%` },
          { label: 'Total de Clientes', value: formatNumber(summary.total_clientes) },
        ].map(({ label, value }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-2xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <h2 className="text-sm font-medium tracking-widest text-slate-500 uppercase mb-4">Segmentos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {summary.segmentos.map((seg) => {
          const config = PERSONA_CONFIG[seg.persona] ?? {
            color: 'text-white', bg: 'bg-slate-800', border: 'border-slate-700',
            badge: 'bg-slate-700', badgeText: 'text-slate-300', emoji: '', priority: '',
            accentColor: '#64748b', priorityNum: '',
          }
          return (
            <Link
              key={seg.cluster}
              href={`/segment/${encodeURIComponent(seg.persona)}`}
              className={`group block rounded-xl border p-6 transition-all hover:scale-[1.01] ${config.bg} ${config.border}`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className={`text-lg font-bold ${config.color}`}>{seg.persona}</span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${config.badge} ${config.badgeText}`}>
                  {config.priority}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Clientes</p>
                  <p className="text-lg font-semibold text-white">{formatNumber(seg.qtd_clientes)}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">Impacto estimado</p>
                  <p className={`text-lg font-semibold ${config.color}`}>{formatCurrency(seg.impacto_estimado)}</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">{seg.acao}</p>
              <p className={`text-xs mt-3 font-medium ${config.color} group-hover:underline`}>
                Ver detalhes →
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/simulate"
          className="inline-block bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-6 py-3 rounded-xl transition-colors"
        >
          Classificar novo cliente →
        </Link>
      </div>
    </main>
  )
}
