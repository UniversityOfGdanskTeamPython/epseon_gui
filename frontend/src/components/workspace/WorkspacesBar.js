import {connect} from "react-redux";
import {setCurrentWorkspace} from "../../ducks/workspaces/actions";
import {useRef} from "react";

const WorkspacesBar = ({workspaces}, props) => {
    const barRef = useRef(null);

    const workspaceCard = (workspace) => {
        return (
            <div
                key={workspace.id}
                className="workspaceCard bgColor2"
                onClick={() => {
                    console.log("test");
                }}
            >
                <div>{workspace.name}</div>
                <div
                    onClick={(event) => {
                        event.stopPropagation();
                        console.log(`del ${workspace.id}`);
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
    setCurrentWorkspace
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspacesBar);
