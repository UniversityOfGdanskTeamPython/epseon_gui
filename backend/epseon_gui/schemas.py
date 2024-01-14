"""Module containing Pydantic models, that act as data containers."""
from __future__ import annotations

from pydantic import BaseModel, ConfigDict


class GenerationDataBase(BaseModel):
    """Base GenerationData schema, used for sending data to db."""

    model_config = ConfigDict(from_attributes=True)
    first_level: int
    last_level: int
    first_atom_mass: float
    second_atom_mass: float
    distance_to_asymptote: float
    integration_step: float
    dispatch_count: int
    group_size: int
    floating_point_precision: int


class GenerationData(GenerationDataBase):
    """Complete GenerationData schema, used for reading/updating data."""

    generation_data_id: int


class WorkspaceBase(BaseModel):
    """Base Workspace schema, used for sending data to db.."""

    model_config = ConfigDict(from_attributes=True)
    workspace_type: str
    workspace_name: str


class Workspace(WorkspaceBase):
    """Complete Workspace schema, used for reading/updating data."""

    workspace_id: int
    workspace_generation_data: list[GenerationData]
    has_generated_data: bool


class GeneratedData(BaseModel):
    """Schema for generated data."""

    model_config = ConfigDict(from_attributes=True)
    some_data: int
    workspace_id: int
