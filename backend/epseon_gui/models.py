"""module containing orm models."""
from __future__ import annotations

from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import JSONB

from epseon_gui.database import Base


class Workspace(Base):
    __tablename__ = "Workspaces"
    Workspace_id = Column(String, primary_key=True)
    Workspace_type = Column(String)
    Workspace_name = Column(String)
    Workspace_data = Column(JSONB, nullable=True)
