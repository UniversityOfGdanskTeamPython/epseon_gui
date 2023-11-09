import {connect} from "react-redux";
import WorkspacesBar from "./WorkspacesBar";
import DefaultWorkspace from "./DefaultWorkspace";
import DataWorkspace from "./dataWorkspace/DataWorkspace";

const WorkspaceWrapper = ({openWorkspaceId, workspaces}, props) => {
    const currentWorkspace = (openWorkspaceId) => {
        if (openWorkspaceId === null) {
            return <DefaultWorkspace />;
        }
        const workspaceData = workspaces.find(
            (workspace) => workspace.id === openWorkspaceId
        );
        if (workspaceData.type === "data") {
            return <DataWorkspace />;
        }
    };

    return (
        <div className="workspaceWrapper">
            <WorkspacesBar />
            {currentWorkspace(openWorkspaceId)}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        openWorkspaceId: state.workspacesReducer.openWorkspaceId,
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceWrapper);
