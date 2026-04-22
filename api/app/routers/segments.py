from fastapi import APIRouter
from app.schemas.segment import CustomerInput, SegmentOutput
from app.services.predictor import predict_segment

router = APIRouter()


@router.post("/predict", response_model=SegmentOutput)
def predict(customer: CustomerInput):
    segment = predict_segment(customer)
    return segment


@router.get("/")
def list_segments():
    return {
        "segments": [
            {"id": 0, "label": "Low Value"},
            {"id": 1, "label": "Mid Value"},
            {"id": 2, "label": "High Value"},
        ]
    }
