"""module containing Pydantic models."""
from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class GenerationDataGeneral(BaseModel):
    firstLevel: int
    lastLevel: int
    firstAtomMass: float
    secondAtomMass: float
    epsilon: float
    h: float
    dispatchCount: int
    groupSize: int
    floatingPointPrecision: int


class GenerationData(GenerationDataGeneral):
    deviceId: int


class WorkspaceGeneral(BaseModel):
    workspace_type: str
    workspace_name: str


class WorkspaceGeneration(WorkspaceGeneral):
    workspace_id: str
    workspace_Generation_data: Optional[GenerationData]


class Workspace(WorkspaceGeneral):
    workspace_Generation_data: Optional[GenerationData]

    class Config:
        orm_mode = True
        from_attributes = True
