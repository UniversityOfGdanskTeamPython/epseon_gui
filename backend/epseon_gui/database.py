"""module for handling database session."""
from __future__ import annotations

from os import getenv

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = f"postgresql://{getenv('POSTGRES_USER')}:localhost:5432@{getenv('SQL_HOST')}:5432/{getenv('POSTGRES_DB')}"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
