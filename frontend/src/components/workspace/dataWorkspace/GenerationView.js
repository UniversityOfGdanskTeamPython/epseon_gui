import {connect} from "react-redux";
import DevicePanel from "./DevicePanel";

const GenerationView = ({openWorkspaceId, workspaces}, props) => {
    // const workspace = workspaces.find((workspace) => workspace.id === openWorkspaceId);

    return (
        <div className="workspace bgColor2">
            <div className="titlePanel bgColor1">Specify generation settings</div>
            <div className="generationViewHorizontalFlex">
                <div className="generationViewVerticalFlex">
                    <div className="panel bgColor1">
                        <div className="panelTitle"> Physical settings</div>
                        <div className="formInput">
                            <label>First level</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>Last level</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>Mass first atom</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>Mass second atom</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>epsilon</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>h</label>
                            <input />
                        </div>
                        <div>upload file ↓</div>
                    </div>
                    <div className="panel bgColor1">
                        <div className="panelTitle"> Hardware settings</div>
                        <div className="formInput">
                            <label>Batch size</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>thread count</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>Floating point precision</label>
                            <input />
                        </div>
                        <div className="smallText">Estimated memory usage:</div>
                        <div className="smallText">Current memory usage:</div>
                    </div>
                </div>
                <DevicePanel />
            </div>
            <button>generate</button>
            <button>see generated data</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(GenerationView);
