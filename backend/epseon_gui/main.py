"""Backend of EPSEON GUI."""
from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING, Dict, List

from fastapi import Depends, FastAPI
from fastapi.staticfiles import StaticFiles

from epseon_gui import crud, models, schemas
from epseon_gui.database import engine, get_db

if TYPE_CHECKING:
    from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

STATIC_DIRECTORY = Path(__file__).parent / "static"


@app.get("/workspaces/", response_model=List[schemas.WorkspaceGeneration])
async def get_all_workspaces_from_db(
    db: Session = Depends(get_db),
) -> List[models.Workspace]:
    """Get list of all workspaces and their data."""
    return crud.get_all_workspaces(db)


@app.delete("/workspaces/")
async def delete_all_workspaces_from_db(db: Session = Depends(get_db)) -> None:
    """Delete all workspaces."""
    crud.remove_all_workspaces(db)


@app.get("/workspace/{workspace_id}", response_model=schemas.WorkspaceGeneration)
async def get_workspace_by_id(
    workspace_id: str,
    db: Session = Depends(get_db),
) -> models.Workspace:
    """Get workspace by id."""
    return crud.get_workspace_by_id(db, workspace_id)


@app.post("/workspace/")
async def create_workspace_in_db(
    workspace: schemas.Workspace,
    db: Session = Depends(get_db),
) -> Dict[str, str]:
    """Add one workspace. Then return its generated id."""
    return crud.create_workspace(db, workspace)


@app.delete("/workspace/{workspace_id}")
async def delete_workspace_by_id(
    workspace_id: str,
    db: Session = Depends(get_db),
) -> None:
    """Delete workspace by id."""
    crud.delete_workspace(db, workspace_id)


@app.put("/workspace/{workspace_id}")
async def update_workspace_in_db_by_id(
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
    db: Session = Depends(get_db),
) -> None:
    """Update workspace."""
    crud.edit_workspace(db, workspace_id, workspace)


@app.put("/workspace/{workspace_id}")
async def update_generation_data_in_db_by_id(
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
    db: Session = Depends(get_db),
) -> None:
    """Update workspace by id."""
    crud.edit_generation_data(db, workspace_id, generation_data)


app.mount("/", StaticFiles(directory=STATIC_DIRECTORY.as_posix()), name="static")
