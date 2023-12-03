"""Backend of EPSEON GUI."""
from __future__ import annotations

from typing import Dict, List

from fastapi import Depends, FastAPI

from epseon_gui import crud, models, schemas
from epseon_gui.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/workspaces/", response_model=List[schemas.WorkspaceGeneration])
async def get_all_workspaces_from_db() -> List[models.Workspace]:
    """Get list of all workspaces and their data."""
    db = Depends(get_db)
    return crud.get_all_workspaces(db)


@app.delete("/workspaces/")
async def delete_all_workspaces_from_db() -> None:
    """Delete all workspaces."""
    db = Depends(get_db)
    crud.remove_all_workspaces(db)


@app.get("/workspace/{workspace_id}", response_model=schemas.WorkspaceGeneration)
async def get_workspace_by_id(workspace_id: str) -> models.Workspace:
    """Get workspace by id."""
    db = Depends(get_db)
    return crud.get_workspace_by_id(db, workspace_id)


@app.post("/workspace/")
async def create_workspace_in_db(workspace: schemas.Workspace) -> Dict[str, str]:
    """Add one workspace. Then return its generated id."""
    db = Depends(get_db)
    return crud.create_workspace(db, workspace)


@app.delete("/workspace/{workspace_id}")
async def delete_workspace_by_id(workspace_id: str) -> None:
    """Delete workspace by id."""
    db = Depends(get_db)
    crud.delete_workspace(db, workspace_id)


@app.put("/workspace/{workspace_id}")
async def update_workspace_in_db_by_id(
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
) -> None:
    """Update workspace."""
    db = Depends(get_db)
    crud.edit_workspace(db, workspace_id, workspace)


@app.put("/workspace/{workspace_id}")
async def update_generation_data_in_db_by_id(
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
) -> None:
    """Update workspace by id."""
    db = Depends(get_db)
    crud.edit_generation_data(db, workspace_id, generation_data)
