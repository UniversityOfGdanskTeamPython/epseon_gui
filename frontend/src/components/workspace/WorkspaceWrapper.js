import {connect} from "react-redux";
import WorkspacesBar from "./WorkspacesBar";
import DefaultWorkspace from "./DefaultWorkspace";
import DataWorkspace from "./dataWorkspace/DataWorkspace";

const WorkspaceWrapper = ({openWorkspaceId, workspaces}, props) => {
    const currentWorkspace = (openWorkspaceId) => {
        const openWorkspace = workspaces.find(
            (workspace) => workspace.workspace_id === openWorkspaceId
        );

        if (openWorkspace == null) {
            return <DefaultWorkspace />;
        } else if (openWorkspace.workspace_type === "data") {
            return <DataWorkspace workspace={openWorkspace} />;
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
