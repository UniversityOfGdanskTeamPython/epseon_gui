"""Backend of EPSEON GUI."""
from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING, List

from fastapi import Depends, FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

from epseon_gui import crud, models, schemas
from epseon_gui.database import engine, get_db

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

STATIC_DIRECTORY = Path(__file__).parent / "static"


@app.get("/workspaces", response_model=list[schemas.Workspace])
async def get_all_workspaces_from_db(
    db: Session = Depends(get_db),
) -> List[models.Workspace]:
    """Get list of all workspaces and their data."""
    return crud.get_all_workspaces(db)


@app.delete("/workspaces")
async def delete_all_workspaces_from_db(db: Session = Depends(get_db)) -> None:
    """Delete all workspaces."""
    crud.remove_all_workspaces(db)


@app.get("/workspaces/{workspace_id}", response_model=schemas.Workspace)
async def get_workspace_by_id(
    workspace_id: int,
    db: Session = Depends(get_db),
) -> models.Workspace:
    """Get workspace by id."""
    workspace = crud.get_workspace_by_id(db, workspace_id)
    if workspace is None:
        raise HTTPException(
            status_code=404,
            detail="Workspace with specified id doesn't exists",
        )
    return workspace


@app.post("/workspaces", response_model=schemas.Workspace)
async def create_workspace_in_db(
    workspace: schemas.WorkspaceBase,
    db: Session = Depends(get_db),
) -> schemas.Workspace:
    """Add one workspace. Then return its generated id."""
    return crud.create_workspace(db, workspace)


@app.delete("/workspaces/{workspace_id}")
async def delete_workspace_by_id(
    workspace_id: int,
    db: Session = Depends(get_db),
) -> None:
    """Delete workspace by id."""
    crud.delete_workspace(db, workspace_id)


@app.put("/workspaces/{workspace_id}", response_model=schemas.Workspace)
async def update_workspace_in_db_by_id(
    workspace_id: int,
    new_workspace_data: schemas.WorkspaceBase,
    db: Session = Depends(get_db),
) -> schemas.Workspace:
    """Update workspace."""
    old_workspace = crud.get_workspace_by_id(db, workspace_id)
    if old_workspace is None:
        raise HTTPException(
            status_code=404,
            detail="Workspace with specified id doesn't exists",
        )
    return crud.edit_workspace(db, workspace_id, new_workspace_data)


@app.post(
    "/workspaces/{workspace_id}/generationData",
    response_model=schemas.GenerationData,
)
async def add_generation_data_to_workspace_in_db_by_id(
    workspace_id: int,
    generation_data: schemas.GenerationDataBase,
    db: Session = Depends(get_db),
) -> schemas.GenerationData:
    """Add generation data to workspace specified by id."""
    workspace = crud.get_workspace_by_id(db, workspace_id)

    if workspace is None:
        raise HTTPException(
            status_code=404,
            detail="Workspace with specified id doesn't exists",
        )

    if workspace.workspace_generation_data != []:
        raise HTTPException(
            status_code=409,
            detail="Specified workspace already has generation data",
        )

    return crud.add_generation_data_to_workspace(db, workspace_id, generation_data)


app.mount("/", StaticFiles(directory=STATIC_DIRECTORY.as_posix()), name="static")
