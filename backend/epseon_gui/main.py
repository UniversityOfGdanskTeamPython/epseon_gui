from fastapi import FastAPI
from epseon_gui.database import SessionLocal, engine

app = FastAPI()

@app.get("/")
def read_root():
    return {"Test": "test"}