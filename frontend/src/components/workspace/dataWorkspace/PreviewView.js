import {connect} from "react-redux";

const PreviewView = ({openWorkspaceId, workspaces}, props) => {
    const workspace = workspaces.find((workspace) => workspace.id === openWorkspaceId);

    return <div className="workspace bgColor2">{workspace.id} prev</div>;
};

const mapStateToProps = (state) => {
    return {
        openWorkspaceId: state.workspacesReducer.openWorkspaceId,
        workspaces: state.workspacesReducer.workspaces
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewView);
