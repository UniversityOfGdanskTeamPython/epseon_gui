import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {
    setCurrentWorkspace,
    addOneWorkspace,
    deleteWorkspace
} from "../../ducks/workspaces/actions";
import {useRef} from "react";

const WorkspacesBar = (
    {workspaces, setCurrentWorkspace, addOneWorkspace, deleteWorkspace},
    props
) => {
    const barRef = useRef(null);

    const workspaceCard = (workspace) => {
        return (
            <div
                key={workspace.workspace_id}
                className="workspaceCard bgColor2"
                onClick={() => {
                    setCurrentWorkspace(workspace.id);
                }}
            >
                <div>{workspace.workspace_name}</div>
                <FontAwesomeIcon
                    icon="fa-solid fa-xmark"
                    className="smallIcon delete"
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteWorkspace(workspace.id);
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
                    addOneWorkspace("new workspace");
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
    addOneWorkspace,
    deleteWorkspace
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacesBar);
