"""module for handling database session."""
from __future__ import annotations

from os import getenv
from typing import Any, Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

POSTGRES_USER = getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = getenv("POSTGRES_PASSWORD", "password")
SQL_HOST = getenv("SQL_HOST", "default")
POSTGRES_DB = getenv("POSTGRES_DB", "default")

DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{SQL_HOST}:5432/{POSTGRES_DB}"
)


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
