"""module containing orm models."""
from __future__ import annotations

from sqlalchemy import Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from epseon_gui.database import Base


class Workspace(Base):
    __tablename__ = "Workspaces"
    workspace_id = Column(String, primary_key=True, index=True)
    workspace_type = Column(String)
    workspace_name = Column(String)
    workspace_Generation_data = relationship(
        "GenerationData",
        back_populates="connected_workspace",
        uselist=False,
    )


class GenerationData(Base):
    __tablename__ = "GenerationData"
    generation_data_id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )
    firstLevel = Column(Integer)
    lastLevel = Column(Integer)
    firstAtomMass = Column(Float)
    secondAtomMass = Column(Float)
    epsilon = Column(Float)
    h = Column(Float)
    dispatchCount = Column(Integer)
    groupSize = Column(Integer)
    floatingPointPrecision = Column(Integer)
    deviceId = Column(Integer)
    workspace_id = Column(String, ForeignKey("Workspaces.workspace_id"), nullable=False)
    connected_workspace = relationship(
        "Workspace",
        back_populates="workspace_Generation_data",
    )
