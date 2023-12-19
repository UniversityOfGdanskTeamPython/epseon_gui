"""Module for handling database session."""
from __future__ import annotations

import platform
from pathlib import Path
from typing import Any, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

FILE_PATH = (
    (
        Path("~/AppData/Local/Epseon/")
        if platform.system() == "Windows"
        else Path("~/.epseon/")
    )
    .expanduser()
    .resolve()
)
FILE_PATH.mkdir(0o666, parents=True, exist_ok=True)
FILE_NAME = "database"
DATABASE_URL = f"sqlite:///{FILE_PATH}/{FILE_NAME}"


engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db() -> Generator[Any, Any, Any]:
    """Get db."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
