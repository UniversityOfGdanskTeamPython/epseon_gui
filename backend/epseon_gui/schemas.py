"""Module containing Pydantic models."""
from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class GenerationDataGeneral(BaseModel):
    """Generation data schema for sending data to db."""

    first_level: int
    last_level: int
    first_atom_mass: float
    second_atom_mass: float
    distance_to_asymptote: float
    integration_step: float
    dispatch_count: int
    group_size: int
    floating_point_precision: int


class GenerationData(GenerationDataGeneral):
    """GenerationData schema for reading/updating data."""

    device_id: int


class WorkspaceGeneral(BaseModel):
    """WorkspaceGeneral for sending data to db.."""

    workspace_type: str
    workspace_name: str


class WorkspaceGeneration(WorkspaceGeneral):
    """WorkspaceGeneration for reading/updating data.."""

    workspace_id: int
    workspace_generation_data: Optional[GenerationData]


class Workspace(WorkspaceGeneral):
    """Workspace."""

    workspace_generation_data: Optional[GenerationData]

    class Config:
        """Configuration. 'from_attributes = True' will tell the Pydantic model to read
        the data even if it is not a dict, but an ORM model.
        """

        from_attributes = True
