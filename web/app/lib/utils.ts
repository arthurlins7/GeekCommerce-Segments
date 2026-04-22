export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export const PERSONA_CONFIG: Record<string, {
  accentColor: string
  priority: string
  priorityNum: string
}> = {
  'Campeões': {
    accentColor: '#22c55e',
    priority: 'Alta Performance',
    priorityNum: 'P2',
  },
  'Em Risco': {
    accentColor: '#f43f5e',
    priority: 'Ação Urgente',
    priorityNum: 'P1',
  },
  'Recorrentes / Promissores': {
    accentColor: '#38bdf8',
    priority: 'Em Crescimento',
    priorityNum: 'P3',
  },
  'Hibernando / Perdidos': {
    accentColor: '#64748b',
    priority: 'Reengajamento',
    priorityNum: 'P4',
  },
}
