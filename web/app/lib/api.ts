const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export interface Segment {
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

export interface Summary {
  faturamento_total: number
  potencial_incremental: number
  upside_percentual: number
  total_clientes: number
  segmentos: Segment[]
}

export async function getSummary(): Promise<Summary> {
  const res = await fetch(`${API_URL}/segments/summary`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Erro ao buscar summary')
  return res.json()
}
