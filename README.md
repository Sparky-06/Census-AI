# Census AI

AI-powered civic issue reporting. Citizens submit photo reports; Gemini Vision
classifies and prioritises them; the authority dashboard shows them in real time.

## Architecture

```
localhost:4000/             → Citizen report form  (Person A)
localhost:4000/api/*        → FastAPI backend       (Person B)
localhost:4000/dashboard/   → Authority dashboard   (Person C)
```

Everything runs from **one server on port 4000**.

---

## One-time setup

```bash
# 1. Python dependencies
pip install -r requirements.txt

# 2. Frontend — install & build
cd frontend
npm install
npm run build
cd ..
```

### Optional: Gemini API key (for real AI classification)
Without a key the backend still works, defaulting every report to category `other`.

```bash
export GEMINI_API_KEY="your-key-here"
```

Or create a `.env` file and load it before starting:
```
GEMINI_API_KEY=your-key-here
```

---

## Run

```bash
uvicorn main:app --host 0.0.0.0 --port 4000 --reload
```

Then open **http://localhost:4000** in your browser.

---

## URLs

| Page | URL |
|---|---|
| Citizen report form | http://localhost:4000/ |
| Authority dashboard | http://localhost:4000/dashboard/ |
| API (JSON) | http://localhost:4000/api/reports |
| API docs (Swagger) | http://localhost:4000/docs |

---

## After changing the dashboard source

If you edit anything inside `frontend/src/`, rebuild before running:

```bash
cd frontend && npm run build && cd ..
```

Then restart uvicorn (or let `--reload` pick it up automatically).
