import {connect} from "react-redux";
import GenerationView from "./GenerationView";
import PreviewView from "./PreviewView";

const DataWorkspace = ({openWorkspaceId, workspaces}, props) => {
    const workspace = workspaces.find((workspace) => workspace.id === openWorkspaceId);

    return workspace.generateMode ? <GenerationView /> : <PreviewView />;
};

const mapStateToProps = (state) => {
    return {
        openWorkspaceId: state.workspacesReducer.openWorkspaceId,
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataWorkspace);
