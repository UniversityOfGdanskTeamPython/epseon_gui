"""Module containing orm models."""
from __future__ import annotations

from sqlalchemy import Boolean, Column, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from epseon_gui.database import Base


class Workspace(Base):
    """Model for workspace."""

    __tablename__ = "workspaces"
    workspace_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    workspace_type = Column(String)
    workspace_name = Column(String)
    has_generated_data = Column(Boolean, default=False)

    workspace_generation_data = relationship(
        "GenerationData",
        back_populates="connected_workspace",
    )


class GenerationData(Base):
    """Model for storing data used in generation."""

    __tablename__ = "generation_data"
    generation_data_id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )
    first_level = Column(Integer)
    last_level = Column(Integer)
    first_atom_mass = Column(Float)
    second_atom_mass = Column(Float)
    distance_to_asymptote = Column(Float)
    integration_step = Column(Float)
    dispatch_count = Column(Integer)
    group_size = Column(Integer)
    floating_point_precision = Column(Integer)
    workspace_id = Column(
        Integer,
        ForeignKey("workspaces.workspace_id"),
        nullable=False,
    )

    connected_workspace = relationship(
        "Workspace",
        back_populates="workspace_generation_data",
    )


class GeneratedData(Base):
    """Model for generated data."""

    __tablename__ = "generated_data"
    generated_data_id = Column(
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
    )
    some_data = Column(Integer)
    workspace_id = Column(
        Integer,
        ForeignKey("workspaces.workspace_id"),
        nullable=False,
    )
