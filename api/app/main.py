from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import segments

app = FastAPI(title="GeekCommerce Segments API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(segments.router, prefix="/segments", tags=["segments"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
