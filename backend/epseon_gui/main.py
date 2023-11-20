"""Backend of EPSEON GUI."""
from __future__ import annotations

from typing import Dict, List
from uuid import uuid4

from fastapi import FastAPI, HTTPException

from epseon_gui import models, schemas
from epseon_gui.database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


workspaces: List[schemas.Workspace] = []  # temporary


@app.get("/")
async def root() -> str:
    """Root."""
    return "root"


@app.post("/generate")
async def generate_data(request: schemas.GenerationData) -> Dict[str, str]:
    """Placeholder for generating output data based on input."""
    return {"generatedData": "UNKNOWN FOR NOW"}


@app.post("/workspaces/")
async def create_workspace(workspace: schemas.WorkspaceGeneration) -> Dict[str, str]:
    """Adds workspace to workspaces; returns id of added workspace"""
    workspace_data = workspace.model_dump()
    workspace_id = str(uuid4())
    generated_workspace = schemas.Workspace(
        Workspace_id=workspace_id,
        Workspace_type=workspace_data["type"],
        Workspace_name=workspace_data["name"],
        Workspace_data=None,
    )
    workspaces.append(generated_workspace)

    return {"id": workspace_id}  # return id of generated workspace


@app.get("/workspaces/", response_model=List[schemas.Workspace])
async def get_all_workspaces() -> List[schemas.Workspace]:
    """Returns list of workspaces."""
    return workspaces


@app.get("/workspace/")
async def get_workspace(workspace_id: str) -> schemas.Workspace:
    """Returns specific workspace based on workspace id."""
    index: int = -1
    for i, workspace in enumerate(workspaces):
        if workspace.Workspace_id == workspace_id:
            index = i
    if index == -1:
        raise HTTPException(status_code=404, detail="Workspace not found")
    else:
        workspace = workspaces[index]

    return workspace


@app.delete("/workspaces/")
async def delete_workspace(workspace_id: str) -> None:
    """Deletes specific workspace based on workspace id."""
    index: int = -1
    for i, workspace in enumerate(workspaces):
        if workspace.Workspace_id == workspace_id:
            index = i
    if index == -1:
        raise HTTPException(status_code=404, detail="Workspace not found")
    else:
        workspaces.pop(index)
