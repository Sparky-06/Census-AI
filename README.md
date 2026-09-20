# Backend API - Census AI

This is the backend implementation for Census AI MVP.

## Setup & Run

1. **Install dependencies:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Set Gemini API Key (optional, for real classification):**
   ```bash
   export GEMINI_API_KEY="your_api_key_here"
   ```

3. **Start the server:**
   ```bash
   uvicorn main:app --host 0.0.0.0 --port 4000 --reload
   ```

The server will run on **http://localhost:4000**.
It seeds 3 sample reports at startup. 

**Endpoints:**
- `GET /api/reports`
- `POST /api/reports`
- `GET /api/reports/{id}`
