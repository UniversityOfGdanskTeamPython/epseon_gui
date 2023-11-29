"""module for handling database session."""
from __future__ import annotations

from os import getenv
from typing import Any, Generator

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

load_dotenv()

DATABASE_URL = f"postgresql://{getenv('POSTGRES_USER')}:{getenv('POSTGRES_PASSWORD')}@{getenv('SQL_HOST')}:5432/{getenv('POSTGRES_DB')}"


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
