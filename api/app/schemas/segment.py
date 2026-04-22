from pydantic import BaseModel
from typing import Optional

class CustomerInput(BaseModel):
    recency: float
    frequency: float
    monetary: float

class SegmentResult(BaseModel):
    cluster: int
    persona: str
    acao: str
    metrica: str
    impacto_estimado: float
    recencia_media: float
    frequencia_media: float
    valor_medio: float
    qtd_clientes: int

class SummaryResult(BaseModel):
    faturamento_total: float
    potencial_incremental: float
    upside_percentual: float
    total_clientes: int
    segmentos: list[SegmentResult]
