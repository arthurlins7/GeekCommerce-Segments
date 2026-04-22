import joblib
import json
import numpy as np
from pathlib import Path

BASE_DIR = Path(__file__).parent

kmeans = joblib.load(BASE_DIR / 'kmeans_geekcommerce.joblib')
scaler = joblib.load(BASE_DIR / 'scaler_geekcommerce.joblib')

with open(BASE_DIR / 'playbook.json', encoding='utf-8') as f:
    playbook = json.load(f)

CLUSTER_MAP = {
    2: 'Campeões',
    3: 'Em Risco',
    0: 'Recorrentes / Promissores',
    1: 'Hibernando / Perdidos'
}

FATURAMENTO_TOTAL = 17_743_429.18
POTENCIAL_INCREMENTAL = 2_695_043.28

def predict_segment(recency: float, frequency: float, monetary: float) -> dict:
    log_values = np.log1p([[recency, frequency, monetary]])
    scaled = scaler.transform(log_values)
    cluster = int(kmeans.predict(scaled)[0])
    persona = CLUSTER_MAP[cluster]
    info = playbook[persona]
    return {
        'cluster': cluster,
        'persona': persona,
        'acao': info['Ação Recomendada'],
        'metrica': info['Métrica de Sucesso'],
        'impacto_estimado': info['Impacto Financeiro Estimado (£)'],
        'recencia_media': info['Recência Média (Dias)'],
        'frequencia_media': info['Frequência Média'],
        'valor_medio': info['Valor Monetário Médio (£)'],
        'qtd_clientes': info['Qtd Clientes'],
    }

def get_summary() -> dict:
    segmentos = []

    for persona, info in playbook.items():
        cluster_id = [k for k, v in CLUSTER_MAP.items() if v == persona][0]
        segmentos.append({
            'cluster': cluster_id,
            'persona': persona,
            'acao': info['Ação Recomendada'],
            'metrica': info['Métrica de Sucesso'],
            'impacto_estimado': info['Impacto Financeiro Estimado (£)'],
            'recencia_media': info['Recência Média (Dias)'],
            'frequencia_media': info['Frequência Média'],
            'valor_medio': info['Valor Monetário Médio (£)'],
            'qtd_clientes': info['Qtd Clientes'],
        })

    return {
        'faturamento_total': FATURAMENTO_TOTAL,
        'potencial_incremental': POTENCIAL_INCREMENTAL,
        'upside_percentual': round((POTENCIAL_INCREMENTAL / FATURAMENTO_TOTAL) * 100, 1),
        'total_clientes': sum(s['qtd_clientes'] for s in segmentos),
        'segmentos': segmentos,
    }