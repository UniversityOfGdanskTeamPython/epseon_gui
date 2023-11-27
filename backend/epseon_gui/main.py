"""Backend of EPSEON GUI."""
from __future__ import annotations

from typing import Dict, List
from uuid import uuid4

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session

from epseon_gui import crud, models, schemas
from epseon_gui.database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/workspaces/", response_model=List[schemas.WorkspaceGeneration])
async def get_all_workspaces_from_db(
    db: Session = Depends(get_db),
) -> List[models.Workspace]:
    """Gets list of all workpaces and their data"""
    workspaces = crud.get_all_workspaces_from_db(db)

    return workspaces


@app.delete("/workspaces/")
async def delete_all_workspaces_from_db(db: Session = Depends(get_db)):
    crud.remove_all_workspaces_in_db(db=db)


@app.get("/workspace/{workspace_id}", response_model=schemas.WorkspaceGeneration)
async def get_workspace_by_id(
    workspace_id: str,
    db: Session = Depends(get_db),
) -> models.Workspace:
    workspace = crud.get_workspace_from_db_by_id(db=db, workspace_id=workspace_id)

    return workspace


@app.post("/workspace/")
async def create_workspace_in_db(
    workspace: schemas.Workspace,
    db: Session = Depends(get_db),
) -> Dict[str, str]:
    """Adds workspace to workspaces; returns id of added workspace"""
    workspace_id = str(uuid4())
    crud.insert_workspace_in_to_db(
        db=db,
        workspace=workspace,
        workspace_id=workspace_id,
    )

    return {"workspace_id": workspace_id}  # return id of generated workspac


@app.post("/workspace/GenerationData/{workspace_id}")
async def add_generation_data_to_workspace_by_id(
    workspace_id: str,
    generation_data: schemas.GenerationData,
    db: Session = Depends(get_db),
) -> Dict[str, str]:
    workspace = crud.get_workspace_from_db_by_id(db=db, workspace_id=workspace_id)
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")
    crud.add_generation_data_to_workspace_in_db(
        db=db,
        workspace_id=workspace_id,
        generation_data=generation_data,
    )

    return {"workspace_id": workspace_id}


@app.delete("/workspace/{workspace_id}")
async def delete_workspace_by_id(
    workspace_id: str,
    db: Session = Depends(get_db),
) -> None:
    """Deletes specific workspace based on workspace id."""
    crud.delete_workspace_from_db(workspace_id=workspace_id, db=db)


@app.put("/workspace/{workspace_id}")
async def update_workspace_in_db_by_id(
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
    db: Session = Depends(get_db),
) -> None:
    crud.edit_workspace_in_db(db=db, workspace_id=workspace_id, workspace=workspace)


@app.put("/workspace/{workspace_id}")
async def update_generation_data_in_db_by_id(
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
    db: Session = Depends(get_db),
) -> None:
    crud.edit_generation_data_in_db(
        db=db,
        workspace_id=workspace_id,
        generation_data=generation_data,
    )
