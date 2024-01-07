"""Module for CURD operations on Database.
For more information on working with SQLAlchemy sessions (database operations),
please check official documentation:
https://docs.sqlalchemy.org/en/20/orm/session_basics.html.
"""
from __future__ import annotations

from typing import List

from sqlalchemy.orm import Session, joinedload

from epseon_gui import models, schemas


def create_workspace(
    db: Session,
    workspace: schemas.WorkspaceBase,
) -> models.Workspace:
    """Insert workspace into db."""
    new_workspace = models.Workspace(**workspace.model_dump())
    db.add(new_workspace)
    db.commit()
    db.refresh(new_workspace)
    return new_workspace


def get_all_workspaces(db: Session) -> List[models.Workspace]:
    """Get all workspaces."""
    return (
        db.query(models.Workspace)
        .options(joinedload(models.Workspace.workspace_generation_data))
        .all()
    )


def delete_workspace(db: Session, workspace_id: int) -> None:
    """Delete workspace from db."""
    workspace_to_delete = (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )
    if workspace_to_delete:
        db.delete(workspace_to_delete)

        workspace_generation_data_to_delete = (
            db.query(models.GenerationData)
            .filter(models.GenerationData.workspace_id == workspace_id)
            .first()
        )
        if workspace_generation_data_to_delete:
            db.delete(workspace_generation_data_to_delete)
    db.commit()


def get_workspace_by_id(db: Session, workspace_id: int) -> models.Workspace:
    """Get workspace from db by id."""
    return (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )


def add_generation_data_to_workspace(
    db: Session,
    workspace_id: int,
    generation_data: schemas.GenerationDataBase,
) -> schemas.GenerationData:
    """Add generation data workspace to db."""
    db_gen_data = models.GenerationData(
        **generation_data.model_dump(),
        workspace_id=workspace_id,
    )

    db.add(db_gen_data)
    db.commit()
    db.refresh(db_gen_data)
    return db_gen_data


def remove_all_workspaces(db: Session) -> None:
    """Remove all workspaces from bd."""
    db.query(models.GenerationData).delete()
    db.query(models.Workspace).delete()
    db.commit()


def edit_workspace(
    db: Session,
    workspace_id: int,
    workspace: schemas.WorkspaceBase,
) -> schemas.Workspace:
    """Edit workspace by id."""
    db.query(models.Workspace).filter(
        models.Workspace.workspace_id == workspace_id,
    ).update(dict(workspace.model_dump()))
    db.commit()

    return (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )
