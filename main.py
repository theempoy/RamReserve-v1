import datetime
import random
import string
from typing import List, Optional
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

# Global database list placeholder to store ticket objects in server memory
tickets = []

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Request Models ---
class LoginRequest(BaseModel):
    email: str
    password: str
    role: str

class StatusUpdateRequest(BaseModel):
    status: str

# --- Route Handling Endpoints ---

@app.post("/api/login")
async def login(payload: LoginRequest):
    # Match the credentials provided in your frontend demo hint box
    if payload.role == "user" and payload.email == "user@ramreserve.com" and payload.password == "user123":
        return {
            "success": True,
            "user": {"email": payload.email, "role": "user", "name": "Ram Student"}
        }
    elif payload.role == "admin" and payload.email == "admin@ramreserve.com" and payload.password == "admin123":
        return {
            "success": True,
            "user": {"email": payload.email, "role": "admin", "name": "System Administrator"}
        }
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED, 
        detail="Invalid email or password"
    )

@app.post("/api/tickets")
async def create_ticket(ticket: dict):
    tickets.insert(0, ticket)
    return {"success": True, "ticket": ticket}

@app.get("/api/tickets")
async def get_tickets():
    return {"success": True, "tickets": tickets}

@app.put("/api/tickets/{ticket_id}/status")
async def update_ticket_status(ticket_id: str, payload: StatusUpdateRequest):
    for ticket in tickets:
        if ticket["id"] == ticket_id:
            ticket["status"] = payload.status
            return {"success": True, "ticket": ticket}
    raise HTTPException(status_code=404, detail="Ticket not found")

# Serve Frontend Static 
app.mount("/", StaticFiles(directory="public", html=True), name="static")