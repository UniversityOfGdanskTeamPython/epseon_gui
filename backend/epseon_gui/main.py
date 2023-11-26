"""Backend of EPSEON GUI."""
from __future__ import annotations

from typing import Dict

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root() -> Dict[str, str]:
    """Root."""
    return {"Test": "test"}
