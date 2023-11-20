"""module for CURD operations on Database."""
from __future__ import annotations

from typing import List

from sqlalchemy.orm import Session

from epseon_gui import models, schemas


def insert_workspace_in_to_db(db: Session, workspace: schemas.Workspace):
    new_workspace = models.Workspace(
        id=workspace.Workspace_id,
        type=workspace.Workspace_type,
        name=workspace.Workspace_name,
        data=workspace.Workspace_data,
    )
    db.add(new_workspace)
    db.commit()
    db.delete


def get_all_workspaces_of_db(db: Session) -> List[schemas.Workspace]:
    workspaces = db.query(schemas.Workspace).all()
    return workspaces
