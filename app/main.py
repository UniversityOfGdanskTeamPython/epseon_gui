from fastapi import FastAPI
from .database import SessionLocal, engine

app = FastAPI()

@app.get("/")
def read_root():
    return {"Test": "test"}