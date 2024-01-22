import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import t from "../../../../ducks/languages/operations";
import DevicePanel from "./DevicePanel";
import {useEffect, useState} from "react";
import Form from "./Form";

const GenerationView = ({workspace}, props) => {
    const [genParamsSpecified, setGenParamsSpecified] = useState(true);

    const [dispatchCount, setDispatchCount] = useState("");
    const [groupSize, setGroupSize] = useState("");
    const [floatingPointPrecision, setFloatingPointPrecision] = useState(32);

    const [firstLevel, setFirstLevel] = useState("");
    const [lastLevel, setLastLevel] = useState("");
    const [firstAtomMass, setFirstAtomMass] = useState("");
    const [secondAtomMass, setSecondAtomMass] = useState("");
    const [distanceToAsymptote, setDistanceToAsymptote] = useState("");
    const [integrationStep, setIntegrationStep] = useState("");

    const [potentialWellWidth, setPotentialWellWidth] = useState("");
    const [dissociationEnergy, setDissociationEnergy] = useState("");
    const [equilibriumBondDistance, setEquilibriumBondDistance] = useState("");
    const [maxR, setMaxR] = useState("");
    const [minR, setMinR] = useState("");
    const [pointsCount, setPointsCount] = useState("");
    const [dataStep, setDataStep] = useState("");
    const [dataCount, setDataCount] = useState("");

    const PhysicalSettingsFormData = [
        {label: "First level", value: firstLevel, setter: setFirstLevel},
        {label: "Last level", value: lastLevel, setter: setLastLevel},
        {label: "First mass atom", value: firstAtomMass, setter: setFirstAtomMass},
        {label: "Second mass atom", value: secondAtomMass, setter: setSecondAtomMass},
        {
            label: "Distance to asymptote",
            value: distanceToAsymptote,
            setter: setDistanceToAsymptote
        },
        {label: "Integration step", value: integrationStep, setter: setIntegrationStep}
    ];

    const MorseCurveParametersFormData = [
        {
            label: "Potential well width",
            value: potentialWellWidth,
            setter: setPotentialWellWidth
        },
        {
            label: "Dissociation energy",
            value: dissociationEnergy,
            setter: setDissociationEnergy
        },
        {
            label: "Equilibrium bond distance",
            value: equilibriumBondDistance,
            setter: setEquilibriumBondDistance
        },
        {label: "Max r", value: maxR, setter: setMaxR},
        {label: "Min r", value: minR, setter: setMinR},
        {label: "Points count", value: pointsCount, setter: setPointsCount},
        {label: "Data step", value: dataStep, setter: setDataStep},
        {label: "Data count", value: dataCount, setter: setDataCount}
    ];

    useEffect(() => {
        const generation_data = workspace.workspace_generation_data[0];

        if (generation_data !== undefined) {
            setGenParamsSpecified(true);

            setDispatchCount(generation_data.dispatch_count);
            setGroupSize(generation_data.group_size);
            setFloatingPointPrecision(generation_data.floating_point_precision);

            setFirstLevel(generation_data.first_level);
            setLastLevel(generation_data.last_level);
            setFirstAtomMass(generation_data.first_atom_mass);
            setSecondAtomMass(generation_data.second_atom_mass);
            setDistanceToAsymptote(generation_data.distance_to_asymptote);
            setIntegrationStep(generation_data.integration_step);
        } else {
            setGenParamsSpecified(false);

            setDispatchCount("");
            setGroupSize("");
            setFloatingPointPrecision("");

            setFirstLevel("");
            setLastLevel("");
            setFirstAtomMass("");
            setSecondAtomMass("");
            setDistanceToAsymptote("");
            setIntegrationStep("");
        }
    }, [workspace]);

    const buttons = () => {
        return (
            <div className="buttonsPanel">
                <div className="button bgColor1">
                    upload file{" "}
                    <FontAwesomeIcon
                        icon="fa-solid fa-file-arrow-up"
                        className="smallIcon"
                    />
                </div>
                <div
                    className="button bgColor1"
                    onClick={() => {
                        generateData();
                    }}
                >
                    generate{" "}
                    <FontAwesomeIcon icon="fa-solid fa-gears" className="smallIcon" />
                </div>
                {workspace.has_generated_data ? (
                    <div className="button bgColor1">see generated data</div>
                ) : null}
            </div>
        );
    };

    const generateData = () => {
        const morseCurveTensor = generateMorseCurveTensor();
        console.log(morseCurveTensor);
    };

    const generateMorseCurveTensor = () => {
        const potentialWellWidthDataList = generateDataSteps(
            parseFloat(potentialWellWidth),
            dataStep,
            dataCount
        );
        const dissociationEnergyDataList = generateDataSteps(
            parseFloat(dissociationEnergy),
            dataStep,
            dataCount
        );
        const equilibriumBondDistanceDataList = generateDataSteps(
            parseFloat(equilibriumBondDistance),
            dataStep,
            dataCount
        );
        const tensor = [];
        for (let x = 0; x < dataCount; x++) {
            const rowX = [];
            for (let y = 0; y < dataCount; y++) {
                const rowY = [];
                for (let z = 0; z < dataCount; z++) {
                    const dataPoint = [
                        potentialWellWidthDataList[x],
                        dissociationEnergyDataList[y],
                        equilibriumBondDistanceDataList[z]
                    ];
                    rowY.push(dataPoint);
                }
                rowX.push(rowY);
            }
            tensor.push(rowX);
        }
        return tensor;
    };

    const generateDataSteps = (initialValue, stepValue, stepsCount) => {
        const dataList = [];
        const stepsCountHalf = Math.floor(stepsCount / 2);
        const isStepsCountOdd = stepsCount % 2 === 1;
        for (let i = 0; i < stepsCountHalf; i++) {
            const stepsAmount = stepsCountHalf - i;
            const step = initialValue - stepValue * stepsAmount;
            dataList.push(step);
        }
        if (isStepsCountOdd) {
            dataList.push(initialValue);
        }
        for (let i = 1; i <= stepsCountHalf; i++) {
            const step = initialValue + stepValue * i;
            dataList.push(step);
        }
        return dataList;
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
                    <Form
                        title="Physical settings"
                        fieldsData={PhysicalSettingsFormData}
                        isDisabled={genParamsSpecified}
                    />
                    <div className="panel bgColor1">
                        <div className="panelTitle">{t("Hardware settings")}</div>
                        <div className="formInput">
                            <label>{t("Dispatch count")}</label>
                            <input
                                type="number"
                                value={dispatchCount}
                                onChange={(event) => {
                                    setDispatchCount(event.target.value);
                                }}
                            />
                        </div>
                        <div className="formInput">
                            <label>{t("Group size")}</label>
                            <input
                                type="number"
                                value={groupSize}
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
                <div className="generationViewSecondFlex">
                    <DevicePanel />
                    <Form
                        title="Morse curve parameters"
                        fieldsData={MorseCurveParametersFormData}
                        isDisabled={false}
                    />
                </div>
            </div>
            {buttons()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.languagesReducer.language
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GenerationView);
