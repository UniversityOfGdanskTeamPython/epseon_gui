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
    workspace: schemas.Workspace,
) -> models.Workspace:
    """Insert workspace into db."""
    new_workspace = models.Workspace(
        workspace_type=workspace.workspace_type,
        workspace_name=workspace.workspace_name,
    )
    db.add(new_workspace)
    if workspace.workspace_generation_data:
        new_workspace_generation_data = models.GenerationData(
            first_level=workspace.workspace_generation_data.first_level,
            last_level=workspace.workspace_generation_data.last_level,
            first_atom_mass=workspace.workspace_generation_data.first_atom_mass,
            second_atom_mass=workspace.workspace_generation_data.second_atom_mass,
            distance_to_asymptote=workspace.workspace_generation_data.distance_to_asymptote,
            integration_step=workspace.workspace_generation_data.integration_step,
            dispatch_count=workspace.workspace_generation_data.dispatch_count,
            group_size=workspace.workspace_generation_data.group_size,
            floating_point_precision=workspace.workspace_generation_data.floating_point_precision,
            device_id=workspace.workspace_generation_data.device_id,
            workspace_id=new_workspace.workspace_id,
        )
        db.add(new_workspace_generation_data)
    db.commit()
    db.refresh(new_workspace)
    return new_workspace


def get_all_workspaces(db: Session) -> List[models.Workspace]:
    """Get all workspaces."""
    workspaces = (
        db.query(models.Workspace)
        .options(joinedload(models.Workspace.workspace_generation_data))
        .all()
    )
    db.refresh(workspaces)

    return workspaces


def delete_workspace(db: Session, workspace_id: str) -> None:
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


def get_workspace_by_id(db: Session, workspace_id: str) -> models.Workspace:
    """Get workspace from db by id."""
    return (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )


def add_generation_data_to_workspace(
    db: Session,
    workspace_id: str,
    generation_data: schemas.GenerationData,
) -> None:
    """Add generation data workspace to db."""
    workspace_generation_data = models.GenerationData(
        first_level=generation_data.first_level,
        last_level=generation_data.last_level,
        first_atom_mass=generation_data.first_atom_mass,
        second_atom_mass=generation_data.second_atom_mass,
        distance_to_asymptote=generation_data.distance_to_asymptote,
        integration_step=generation_data.integration_step,
        dispatch_count=generation_data.dispatch_count,
        group_size=generation_data.group_size,
        floating_point_precision=generation_data.floating_point_precision,
        device_id=generation_data.device_id,
        workspace_id=workspace_id,
    )

    db.add(workspace_generation_data)
    db.commit()
    db.refresh(workspace_generation_data)


def remove_all_workspaces(db: Session) -> None:
    """Remove all workspaces from bd."""
    db.query(models.GenerationData).delete()
    db.query(models.Workspace).delete()
    db.commit()


def edit_workspace(
    db: Session,
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
) -> None:
    """Edit workspace by id."""
    db.query(models.Workspace).filter(
        models.Workspace.workspace_id == workspace_id,
    ).update(dict(workspace.model_dump()))
    db.commit()


def edit_generation_data(
    db: Session,
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
) -> None:
    """Edit generation data in db. Whatever that means (this shouldn't be possible)."""
    db.query(models.GenerationData).filter(
        models.GenerationData.workspace_id == workspace_id,
    ).update(dict(generation_data.model_dump()))
    db.commit()
