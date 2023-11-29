"""Backend of EPSEON GUI."""
from __future__ import annotations

from typing import Dict, List
from uuid import uuid4

from fastapi import Depends, FastAPI

from epseon_gui import crud, models, schemas
from epseon_gui.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/workspaces/", response_model=List[schemas.WorkspaceGeneration])
async def get_all_workspaces_from_db() -> List[models.Workspace]:
    """Get list of all workspaces and their data."""
    db = Depends(get_db)
    return crud.get_all_workspaces_from_db(db)


@app.delete("/workspaces/")
async def delete_all_workspaces_from_db() -> None:
    """Delete all workspaces."""
    db = Depends(get_db)
    crud.remove_all_workspaces_in_db(db)


@app.get("/workspace/{workspace_id}", response_model=schemas.WorkspaceGeneration)
async def get_workspace_by_id(
    workspace_id: str,
) -> models.Workspace:
    """Get workspace by id."""
    db = Depends(get_db)
    return crud.get_workspace_from_db_by_id(db=db, workspace_id=workspace_id)


@app.post("/workspace/")
async def create_workspace_in_db(workspace: schemas.Workspace) -> Dict[str, str]:
    """Add one workspace. Then return its generated id."""
    workspace_id = str(uuid4())
    db = Depends(get_db)
    crud.insert_workspace_in_to_db(
        db=db,
        workspace=workspace,
        workspace_id=workspace_id,
    )

    return {"workspace_id": workspace_id}


@app.delete("/workspace/{workspace_id}")
async def delete_workspace_by_id(workspace_id: str) -> None:
    """Delete workspace by id."""
    db = Depends(get_db)
    crud.delete_workspace_from_db(workspace_id=workspace_id, db=db)


@app.put("/workspace/{workspace_id}")
async def update_workspace_in_db_by_id(
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
) -> None:
    """Update workspace."""
    db = Depends(get_db)
    crud.edit_workspace_in_db(db=db, workspace_id=workspace_id, workspace=workspace)


@app.put("/workspace/{workspace_id}")
async def update_generation_data_in_db_by_id(
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
) -> None:
    """Update workspace by id."""
    db = Depends(get_db)
    crud.edit_generation_data_in_db(
        db=db,
        workspace_id=workspace_id,
        generation_data=generation_data,
    )
