import os
import numpy as np
import joblib
from app.schemas.segment import CustomerInput, SegmentOutput

MODEL_PATH = os.getenv("MODEL_PATH", "models/segment_model.joblib")

_model = None

SEGMENT_LABELS = {0: "Low Value", 1: "Mid Value", 2: "High Value"}


def _load_model():
    global _model
    if _model is None and os.path.exists(MODEL_PATH):
        _model = joblib.load(MODEL_PATH)
    return _model


def predict_segment(customer: CustomerInput) -> SegmentOutput:
    model = _load_model()
    features = np.array([[customer.recency, customer.frequency, customer.monetary]])

    if model is not None:
        segment_id = int(model.predict(features)[0])
        proba = model.predict_proba(features)[0]
        confidence = float(proba[segment_id])
    else:
        # Fallback rule-based segmentation when no model is trained yet
        score = customer.frequency * customer.monetary / max(customer.recency, 1)
        if score > 500:
            segment_id, confidence = 2, 0.85
        elif score > 100:
            segment_id, confidence = 1, 0.75
        else:
            segment_id, confidence = 0, 0.80

    return SegmentOutput(
        customer_id=customer.customer_id,
        segment_id=segment_id,
        segment_label=SEGMENT_LABELS[segment_id],
        confidence=confidence,
    )
