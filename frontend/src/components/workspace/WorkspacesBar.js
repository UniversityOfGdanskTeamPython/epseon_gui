import {connect} from "react-redux";
import {setCurrentWorkspace, deleteWorkspace} from "../../ducks/workspaces/actions";
import {useRef} from "react";

const WorkspacesBar = ({workspaces, setCurrentWorkspace, deleteWorkspace}, props) => {
    const barRef = useRef(null);

    const workspaceCard = (workspace) => {
        return (
            <div
                key={workspace.id}
                className="workspaceCard bgColor2"
                onClick={() => {
                    setCurrentWorkspace(workspace.id);
                }}
            >
                <div>{workspace.name}</div>
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        deleteWorkspace(workspace.id);
                    }}
                >
                    x
                </div>
            </div>
        );
    };

    return (
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
    );
};

const mapStateToProps = (state) => {
    return {
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {
    setCurrentWorkspace,
    deleteWorkspace
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacesBar);
