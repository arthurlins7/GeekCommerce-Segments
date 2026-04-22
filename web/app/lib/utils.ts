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
  color: string
  bg: string
  border: string
  badge: string
  badgeText: string
  emoji: string
  priority: string
  accentColor: string
  priorityNum: string
}> = {
  'Campeões': {
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/30',
    badge: 'bg-emerald-400/20',
    badgeText: 'text-emerald-300',
    emoji: '',
    priority: 'Alta Performance',
    accentColor: '#22c55e',
    priorityNum: 'P2',
  },
  'Em Risco': {
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    border: 'border-red-400/30',
    badge: 'bg-red-400/20',
    badgeText: 'text-red-300',
    emoji: '',
    priority: 'Ação Urgente',
    accentColor: '#f43f5e',
    priorityNum: 'P1',
  },
  'Recorrentes / Promissores': {
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    border: 'border-blue-400/30',
    badge: 'bg-blue-400/20',
    badgeText: 'text-blue-300',
    emoji: '',
    priority: 'Em Crescimento',
    accentColor: '#38bdf8',
    priorityNum: 'P3',
  },
  'Hibernando / Perdidos': {
    color: 'text-slate-400',
    bg: 'bg-slate-400/10',
    border: 'border-slate-400/30',
    badge: 'bg-slate-400/20',
    badgeText: 'text-slate-300',
    emoji: '',
    priority: 'Reengajamento',
    accentColor: '#64748b',
    priorityNum: 'P4',
  },
}
