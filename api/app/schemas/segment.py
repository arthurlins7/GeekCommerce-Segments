from pydantic import BaseModel, Field


class CustomerInput(BaseModel):
    customer_id: str = Field(..., example="C001")
    recency: int = Field(..., ge=0, description="Days since last purchase")
    frequency: int = Field(..., ge=0, description="Number of purchases")
    monetary: float = Field(..., ge=0, description="Total spend in BRL")


class SegmentOutput(BaseModel):
    customer_id: str
    segment_id: int
    segment_label: str
    confidence: float
