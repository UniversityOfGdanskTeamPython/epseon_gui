"""module containing Pydantic models."""
from __future__ import annotations

from typing import Optional

from pydantic import BaseModel


class GenerationData(BaseModel):
    firstLevel: int
    lastLevel: int
    firstAtomMass: float
    secondAtomMass: float
    epsilon: float
    h: float
    dispatchCount: int
    groupSize: int
    floatingPointPrecision: int
    deviceId: int


class WorkspaceGeneration(BaseModel):
    WorkspaceGeneration_type: str
    WorkspaceGeneration_name: str
    WorkspaceGeneration_workdata: Optional[GenerationData]


class Workspace(BaseModel):
    Workspace_id: str
    Workspace_type: str
    Workspace_name: str
    Workspace_data: Optional[GenerationData]
