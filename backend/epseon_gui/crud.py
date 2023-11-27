"""module for CURD operations on Database."""
from __future__ import annotations

from typing import List

from sqlalchemy.orm import Session, joinedload

from epseon_gui import models, schemas


def insert_workspace_in_to_db(
    db: Session,
    workspace: schemas.Workspace,
    workspace_id: str,
) -> None:
    new_workspace = models.Workspace(
        workspace_id=workspace_id,
        workspace_type=workspace.workspace_type,
        workspace_name=workspace.workspace_name,
    )
    db.add(new_workspace)
    if workspace.workspace_Generation_data:
        new_workspace_Generation_data = models.GenerationData(
            firstLevel=workspace.workspace_Generation_data.firstLevel,
            lastLevel=workspace.workspace_Generation_data.lastLevel,
            firstAtomMass=workspace.workspace_Generation_data.firstAtomMass,
            secondAtomMass=workspace.workspace_Generation_data.secondAtomMass,
            epsilon=workspace.workspace_Generation_data.epsilon,
            h=workspace.workspace_Generation_data.h,
            dispatchCount=workspace.workspace_Generation_data.dispatchCount,
            groupSize=workspace.workspace_Generation_data.groupSize,
            floatingPointPrecision=workspace.workspace_Generation_data.floatingPointPrecision,
            deviceId=workspace.workspace_Generation_data.deviceId,
            workspace_id=workspace_id,
        )
        db.add(new_workspace_Generation_data)
    db.commit()
    db.delete


def get_all_workspaces_from_db(db: Session) -> List[models.Workspace]:
    workspaces = (
        db.query(models.Workspace)
        .options(joinedload(models.Workspace.workspace_Generation_data))
        .all()
    )
    db.delete

    return workspaces


def delete_workspace_from_db(db: Session, workspace_id: str) -> None:
    workspace_to_delete = (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )
    if workspace_to_delete:
        db.delete(workspace_to_delete)

        workspace_Generation_data_to_delete = (
            db.query(models.GenerationData)
            .filter(models.GenerationData.workspace_id == workspace_id)
            .first()
        )
        if workspace_Generation_data_to_delete:
            db.delete(workspace_Generation_data_to_delete)
    db.commit()


def get_workspace_from_db_by_id(db: Session, workspace_id: str) -> models.Workspace:
    workspace = (
        db.query(models.Workspace)
        .filter(models.Workspace.workspace_id == workspace_id)
        .first()
    )

    return workspace


def add_generation_data_to_workspace_in_db(
    db: Session,
    workspace_id: str,
    generation_data: schemas.GenerationData,
) -> None:
    workspace_Generation_data = models.GenerationData(
        firstLevel=generation_data.firstLevel,
        lastLevel=generation_data.lastLevel,
        firstAtomMass=generation_data.firstAtomMass,
        secondAtomMass=generation_data.secondAtomMass,
        epsilon=generation_data.epsilon,
        h=generation_data.h,
        dispatchCount=generation_data.dispatchCount,
        groupSize=generation_data.groupSize,
        floatingPointPrecision=generation_data.floatingPointPrecision,
        deviceId=generation_data.deviceId,
        workspace_id=workspace_id,
    )

    db.add(workspace_Generation_data)
    db.commit()
    db.delete


def remove_all_workspaces_in_db(db: Session) -> None:
    db.query(models.GenerationData).delete()
    db.query(models.Workspace).delete()
    db.commit()


def edit_workspace_in_db(
    db: Session,
    workspace_id: str,
    workspace: schemas.WorkspaceGeneral,
) -> None:
    db.query(models.Workspace).filter(
        models.Workspace.workspace_id == workspace_id,
    ).update(dict(workspace.model_dump()))
    db.commit()


def edit_generation_data_in_db(
    db: Session,
    workspace_id: str,
    generation_data: schemas.GenerationDataGeneral,
) -> None:
    db.query(models.GenerationData).filter(
        models.GenerationData.workspace_id == workspace_id,
    ).update(dict(generation_data.model_dump()))
    db.commit()
