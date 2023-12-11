import {connect} from "react-redux";
import GenerationView from "./generation/GenerationView";
import PreviewView from "./preview/PreviewView";

const DataWorkspace = ({openWorkspaceId, workspaces}, props) => {
    const workspace = workspaces.find((workspace) => workspace.id === openWorkspaceId);

    return workspace.data !== null ? <PreviewView /> : <GenerationView noData={true} />;
};

const mapStateToProps = (state) => {
    return {
        openWorkspaceId: state.workspacesReducer.openWorkspaceId,
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataWorkspace);
