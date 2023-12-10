import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import t from "../../../../ducks/languages/operations";
import DevicePanel from "./DevicePanel";
import {useState} from "react";

const GenerationView = ({noData, openWorkspaceId, workspaces}, props) => {
    const [dispatchCount, setDispatchCount] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [floatingPointPrecision, setFloatingPointPrecision] = useState(32);

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

    const estimatedMemoryUsage = () => {
        if (dispatchCount && groupSize) {
            const floatingPointPrecisionEquationValue =
                floatingPointPrecision === 32 ? 4 : 8;
            const memoryUsage =
                dispatchCount * groupSize * floatingPointPrecisionEquationValue * 7;
            const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
            const unitIndex = Math.floor(Math.log(memoryUsage) / Math.log(1000));
            const unit = units[unitIndex];
            const memoryUsageInUnits = parseFloat(
                (memoryUsage / Math.pow(1000, unitIndex)).toFixed(2)
            );
            return `${memoryUsageInUnits}${unit}`;
        }
        return null;
    };

    const onFloatingPointChange = (event) => {
        setFloatingPointPrecision(parseInt(event.target.id));
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
                            <label>{t("Distance to asymptote")}</label>
                            <input />
                        </div>
                        <div className="formInput">
                            <label>{t("Integration step")}</label>
                            <input />
                        </div>
                    </div>
                    <div className="panel bgColor1">
                        <div className="panelTitle">{t("Hardware settings")}</div>
                        <div className="formInput">
                            <label>{t("Dispatch count")}</label>
                            <input
                                value={dispatchCount}
                                type="number"
                                onChange={(event) => {
                                    setDispatchCount(event.target.value);
                                }}
                            />
                        </div>
                        <div className="formInput">
                            <label>{t("Group size")}</label>
                            <input
                                value={groupSize}
                                type="number"
                                onChange={(event) => {
                                    setGroupSize(event.target.value);
                                }}
                            />
                        </div>
                        <div className="formRadioInput">
                            <legend>{t("Floating point precision")}</legend>
                            <div className="radioButtons">
                                <div className="radioButtonWrapper">
                                    <label htmlFor="32">float32</label>
                                    <input
                                        type="radio"
                                        name="floatingPoint"
                                        id={32}
                                        onChange={onFloatingPointChange}
                                        defaultChecked
                                    />
                                </div>
                                <div className="radioButtonWrapper">
                                    <label htmlFor="64">float64</label>
                                    <input
                                        type="radio"
                                        name="floatingPoint"
                                        id={64}
                                        onChange={onFloatingPointChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="smallText">
                            {t("Estimated memory usage:")} {estimatedMemoryUsage()}
                        </div>
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
