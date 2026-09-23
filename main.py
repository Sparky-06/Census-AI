import os
import uuid
from datetime import datetime, timezone
from typing import Optional
from fastapi import FastAPI, File, Form, UploadFile, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from google import genai
from PIL import Image

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# We will mount the built React frontend at / at the bottom of the file
_dashboard_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

reports = []

def get_iso8601():
    return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

reports.extend([
    {
        "id": str(uuid.uuid4()),
        "category": "pothole",
        "priority": "High",
        "priority_score": 70,
        "status": "reported",
        "photo_url": "http://localhost:4000/uploads/seed1.jpg",
        "location": "MG Road near bus stop",
        "description": "Large pothole causing traffic",
        "created_at": get_iso8601(),
        "updated_at": get_iso8601()
    },
    {
        "id": str(uuid.uuid4()),
        "category": "garbage",
        "priority": "Low",
        "priority_score": 35,
        "status": "reported",
        "photo_url": "http://localhost:4000/uploads/seed2.jpg",
        "location": "Central Park entrance",
        "description": "Overflowing trash bin",
        "created_at": get_iso8601(),
        "updated_at": get_iso8601()
    },
    {
        "id": str(uuid.uuid4()),
        "category": "water_leak",
        "priority": "Medium",
        "priority_score": 65,
        "status": "reported",
        "photo_url": "http://localhost:4000/uploads/seed3.jpg",
        "location": "Main St & 5th Ave",
        "description": "Water leaking from fire hydrant",
        "created_at": get_iso8601(),
        "updated_at": get_iso8601()
    }
])

CATEGORIES = ["pothole", "garbage", "drainage", "streetlight", "water_leak", "other"]

def classify_image(file_path: str) -> str:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("Warning: GEMINI_API_KEY not set. Defaulting to 'other'.")
        return "other"
    try:
        client = genai.Client(api_key=api_key)
        prompt = f"Analyze this image and classify the issue into EXACTLY ONE of these categories: {', '.join(CATEGORIES)}. Return ONLY the category name."
        img = Image.open(file_path)
        
        # We use gemini-2.5-flash as it is fast and supports vision
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, img]
        )
        cat = response.text.strip().lower()
        
        for c in CATEGORIES:
            if c in cat:
                return c
        return "other"
    except Exception as e:
        print(f"Classification error: {e}")
        return "other"

def calculate_priority(category: str) -> tuple:
    base_severity = { 
        "pothole": 70, 
        "water_leak": 65, 
        "drainage": 55,
        "streetlight": 40, 
        "garbage": 35, 
        "other": 30 
    }
    score = base_severity.get(category, 30)
    if score >= 66:
        priority = "High"
    elif score >= 40:
        priority = "Medium"
    else:
        priority = "Low"
    return score, priority

@app.post("/api/reports")
async def create_report(
    request: Request,
    photo: UploadFile = File(...),
    location: str = Form(...),
    description: Optional[str] = Form("")
):
    try:
        if not photo:
            return JSONResponse(status_code=400, content={"error": "Missing photo", "code": "BAD_REQUEST"})
            
        file_ext = photo.filename.split('.')[-1] if '.' in photo.filename else 'jpg'
        filename = f"{uuid.uuid4()}.{file_ext}"
        filepath = os.path.join("uploads", filename)
        
        with open(filepath, "wb") as f:
            f.write(await photo.read())
            
        category = classify_image(filepath)
        score, priority_label = calculate_priority(category)
        
        now = get_iso8601()
        report_id = str(uuid.uuid4())
        
        # Use localhost:4000 as specified in docs, or dynamically from request
        base_url = "http://localhost:4000"
        photo_url = f"{base_url}/uploads/{filename}"
        
        report = {
            "id": report_id,
            "category": category,
            "priority": priority_label,
            "priority_score": score,
            "status": "reported",
            "photo_url": photo_url,
            "location": location,
            "description": description,
            "created_at": now,
            "updated_at": now
        }
        
        reports.append(report)
        return JSONResponse(status_code=201, content=report)
        
    except Exception as e:
        return JSONResponse(
            status_code=500, 
            content={"error": str(e), "code": "INTERNAL_ERROR"}
        )

@app.get("/api/reports")
async def get_reports():
    # Return all reports, sorted by priority_score descending
    sorted_reports = sorted(reports, key=lambda x: x["priority_score"], reverse=True)
    return sorted_reports

@app.get("/api/reports/{id}")
async def get_report(id: str):
    for r in reports:
        if r["id"] == id:
            return r
    return JSONResponse(status_code=404, content={"error": "Report not found", "code": "NOT_FOUND"})

# Serve the built React app at the root (must be mounted last to not override /api and /uploads)
if os.path.isdir(_dashboard_dist):
    # Ensure static files serve correctly with proper Permissions-Policy
    class CustomStaticFiles(StaticFiles):
        def is_not_modified(self, response_headers, request_headers) -> bool:
            return False # For dev reload purposes

        async def get_response(self, path: str, scope):
            response = await super().get_response(path, scope)
            response.headers["Permissions-Policy"] = "camera=*, geolocation=*, microphone=*"
            return response
            
    app.mount("/", CustomStaticFiles(directory=_dashboard_dist, html=True), name="frontend")
