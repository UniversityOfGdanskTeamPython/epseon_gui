import {connect} from "react-redux";
import GenerationView from "./generation/GenerationView";
import PreviewView from "./preview/PreviewView";

const DataWorkspace = ({workspace}, props) => {
    return workspace.has_generated_data ? (
        <PreviewView workspace={workspace} />
    ) : (
        <GenerationView workspace={workspace} />
    );
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DataWorkspace);
