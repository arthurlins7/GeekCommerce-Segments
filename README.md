# GeekCommerce Segments

## Sobre

Plataforma de segmentação de clientes para e-commerce geek, utilizando técnicas de Machine Learning (RFM + clustering) para classificar clientes em perfis de valor e personalizar ações de marketing.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Backend | FastAPI (Python) |
| ML | scikit-learn, pandas, numpy, joblib |
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Infra | Docker (em breve) |

## Como rodar

### Backend (API)

```bash
cd api
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Acesse a documentação interativa em: http://localhost:8000/docs

### Frontend (Web)

```bash
cd web
npm install
npm run dev
```

Acesse em: http://localhost:3000
