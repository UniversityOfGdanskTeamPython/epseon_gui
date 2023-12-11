import {connect} from "react-redux";
import wave0 from "../../../../assets/wave_example0.json";
import wave1 from "../../../../assets/wave_example1.json";
import wave2 from "../../../../assets/wave_example2.json";
import t from "../../../../ducks/languages/operations";
import WidgetPlot from "./WidgetPlot";
import WidgetPlotSettings from "./WidgetPlotSettings";
import {useState} from "react";
import approximationFunctions from "./approximationMethods";
import WidgetCurveSelection from "./WidgetCurveSelection";

const PreviewView = ({openWorkspaceId, workspaces}, props) => {
    const curves = [
        {id: 0, name: "level 0", value: wave0},
        {id: 1, name: "level 1", value: wave1},
        {id: 2, name: "level 2", value: wave2}
    ];
    const [selectedCurves, setSelectedCurves] = useState([]);

    const [approximationFunction, setApproximationFunction] = useState(
        approximationFunctions[0]
    );
    const [approximationChunkSize, setApproximationChunkSize] = useState(20);

    const rangeMin = curves[0].value[0].x;
    const rangeMax = curves[0].value[curves[0].value.length - 1].x;
    const [displayRangeMin, setDisplayRangeMin] = useState(curves[0].value[0].x);
    const [displayRangeMax, setDisplayRangeMax] = useState(
        curves[0].value[curves[0].value.length - 1].x
    );

    return (
        <div className="workspace bgColor2">
            <div className="titlePanel bgColor1">{t("Preview")}</div>
            <div className="generationViewPlotWrapper">
                <WidgetPlot
                    selectedCurves={selectedCurves}
                    displayRangeMin={displayRangeMin}
                    displayRangeMax={displayRangeMax}
                    approximationChunkSize={approximationChunkSize}
                    approximationFunction={approximationFunction}
                />
                <WidgetPlotSettings
                    setApproximationFunction={setApproximationFunction}
                    approximationChunkSize={approximationChunkSize}
                    setApproximationChunkSize={setApproximationChunkSize}
                    rangeMin={rangeMin}
                    rangeMax={rangeMax}
                    displayRangeMin={displayRangeMin}
                    displayRangeMax={displayRangeMax}
                    setDisplayRangeMin={setDisplayRangeMin}
                    setDisplayRangeMax={setDisplayRangeMax}
                />
                <WidgetCurveSelection
                    curves={curves}
                    selectedCurves={selectedCurves}
                    setSelectedCurves={setSelectedCurves}
                />
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(PreviewView);
