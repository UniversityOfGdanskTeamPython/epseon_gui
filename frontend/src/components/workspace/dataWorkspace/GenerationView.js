import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import t from "../../../ducks/languages/operations";
import DevicePanel from "./DevicePanel";

const GenerationView = ({noData, openWorkspaceId, workspaces}, props) => {
    // const workspace = workspaces.find((workspace) => workspace.id === openWorkspaceId);
    const buttons = () => {
        return (
            <div className="buttonsPanel">
                <div className="button bgColor1">
                    generate{" "}
                    <FontAwesomeIcon icon="fa-solid fa-gears" className="smallIcon" />
                </div>
                <div className="button bgColor1">
                    upload file{" "}
                    <FontAwesomeIcon
                        icon="fa-solid fa-file-arrow-up"
                        className="smallIcon"
                    />
                </div>
                {noData ? null : (
                    <div className="button bgColor1">see generated data</div>
                )}
            </div>
        );
    };

    return (
        <div className="workspace bgColor2">
            <div className="titlePanel bgColor1">
                {t("Specify generation settings")}
            </div>
            <div className="generationViewFirstFlex">
                <div className="generationViewSecondFlex">
                    <div className="panel bgColor1">
                        <div className="panelTitle">{t("Physical settings")}</div>
                        <div className="formInput">
                            <label>{t("First level")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("Last level")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("First mass atom")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("Second mass atom")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("epsilon")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("h")}</label>
                            <input />
                        </div>
                    </div>
                    <div className="panel bgColor1">
                        <div className="panelTitle">{t("Hardware settings")}</div>
                        <div className="formInput">
                            <label>{t("Batch size")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("thread count")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("Floating point precision")}</label>
                            <input />
                        </div>
                        <div className="smallText">{t("Estimated memory usage:")}</div>
                        <div className="smallText">{t("Current memory usage:")}</div>
                    </div>
                </div>
                <DevicePanel />
            </div>
            {buttons()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        openWorkspaceId: state.workspacesReducer.openWorkspaceId,
        workspaces: state.workspacesReducer.workspaces,
        language: state.languagesReducer.language
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GenerationView);
