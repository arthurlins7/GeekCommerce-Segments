from fastapi import APIRouter
from app.schemas.segment import CustomerInput, SegmentResult, SummaryResult
from app.services.predictor import predict_segment, get_summary

router = APIRouter(prefix='/segments', tags=['segments'])

@router.get('/summary', response_model=SummaryResult)
def summary():
    return get_summary()

@router.post('/predict', response_model=SegmentResult)
def predict(customer: CustomerInput):
    return predict_segment(
        recency=customer.recency,
        frequency=customer.frequency,
        monetary=customer.monetary
    )
