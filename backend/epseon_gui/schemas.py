"""module containing Pydantic models."""
from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class GenerationDataGeneral(BaseModel):
    """Generation data schema."""

    first_level: int
    last_level: int
    first_atom_mass: float
    second_atom_mass: float
    epsilon: float
    h: float
    dispatch_count: int
    group_size: int
    floating_point_precision: int


class GenerationData(GenerationDataGeneral):
    """GenerationData."""

    device_id: int


class WorkspaceGeneral(BaseModel):
    """WorkspaceGeneral."""

    workspace_type: str
    workspace_name: str


class WorkspaceGeneration(WorkspaceGeneral):
    """WorkspaceGeneration."""

    workspace_id: str
    workspace_generation_data: Optional[GenerationData]


class Workspace(WorkspaceGeneral):
    """Workspace."""

    workspace_generation_data: Optional[GenerationData]

    class Config:
        """Config."""

        orm_mode = True
        from_attributes = True
