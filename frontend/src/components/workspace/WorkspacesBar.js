import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {setCurrentWorkspace} from "../../ducks/workspaces/actions";
import {addWorkspace, delWorkspace} from "../../ducks/workspaces/operations";
import {useRef} from "react";

const WorkspacesBar = (
    {workspaces, setCurrentWorkspace, addWorkspace, delWorkspace},
    props
) => {
    const barRef = useRef(null);

    const workspaceCard = (workspace) => {
        return (
            <div
                key={workspace.workspace_id}
                className="workspaceCard bgColor2"
                onClick={() => {
                    setCurrentWorkspace(workspace.workspace_id);
                }}
            >
                <div>{workspace.workspace_name}</div>
                <FontAwesomeIcon
                    icon="fa-solid fa-xmark"
                    className="smallIcon delete"
                    onClick={(event) => {
                        event.stopPropagation();
                        delWorkspace(workspace.workspace_id);
                    }}
                />
            </div>
        );
    };

    const addWorkspaceButton = () => {
        return (
            <div
                className="bgColor2"
                onClick={() => {
                    const newWorkspace = {
                        workspace_type: "data",
                        workspace_name: "new workspace"
                    };
                    addWorkspace(newWorkspace);
                }}
            >
                <FontAwesomeIcon icon="fa-solid fa-plus" className="smallIcon" />
                new workspace
            </div>
        );
    };

    return (
        <div>
            <div
                className="workspacesBar scroll"
                onWheel={(event) => {
                    barRef.current.scrollLeft += event.deltaY;
                }}
                ref={barRef}
            >
                {workspaces.map((workspace) => {
                    return workspaceCard(workspace);
                })}
            </div>
            {addWorkspaceButton()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {
    setCurrentWorkspace,
    addWorkspace,
    delWorkspace
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacesBar);
