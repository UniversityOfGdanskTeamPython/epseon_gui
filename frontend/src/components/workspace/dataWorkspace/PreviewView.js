import {connect} from "react-redux";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line
} from "recharts";
import wave0 from "../../../assets/wave_example0.json";
import wave1 from "../../../assets/wave_example1.json";
import wave2 from "../../../assets/wave_example2.json";
import t from "../../../ducks/languages/operations";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Unstable_NumberInput as NumberInput} from "@mui/base/Unstable_NumberInput";
import {useState} from "react";
import approximationFunctions from "./approximationMethods";

const PreviewView = ({openWorkspaceId, workspaces}, props) => {
    const waveData = [
        {id: 0, name: "wave0", value: wave0},
        {id: 1, name: "wave1", value: wave1},
        {id: 2, name: "wave2", value: wave2}
    ];
    const [curves, setCurves] = useState([]);
    const [approximationFunction, setApproximationFunction] = useState(
        approximationFunctions[0]
    );

    const [chunkSize, setChunkSize] = useState(20);
    const [rangeMin, setRangeMin] = useState(waveData[0].value[0].x);
    const [rangeMax, setRangeMax] = useState(
        waveData[0].value[waveData[0].value.length - 1].x
    );

    const formatData = () => {
        // console.log(curves, curves[0]);
        if (curves.length === 0) {
            return [];
        }

        const plotData = [];
        const startingValue = curves[0].value.filter(
            (value) => value.x < rangeMin
        ).length;
        const endingValue = curves[0].value.filter(
            (value) => value.x <= rangeMax
        ).length;

        // console.log({curves, startingValue, endingValue});
        for (let i = startingValue; i < endingValue; i++) {
            const curvesData = {x: curves[0].value[i].x};
            for (const curve of curves) {
                curvesData[curve.name] = curve.value[i].y;
            }
            plotData.push(curvesData);
        }

        const approximatedData = approximateData(plotData);

        // console.log({curves, plotData, approximatedData});
        return approximatedData;
    };

    const approximateData = (data) => {
        if (chunkSize === 1) {
            return data;
        }
        const approximation = [];
        console.log(data.length);
        for (let i = 0; i < data.length; i += chunkSize) {
            const chunk = data.slice(i, i + chunkSize);
            const approximatedValue = approximationFunction.function(chunk);
            // console.log({chunk, approximatedValue});
            approximation.push(approximatedValue);
        }
        // console.log(approximation);
        return approximation;
    };

    const handleCurveSelectionChange = (curveData) => {
        const curvesIdList = curves.map((data) => data.id);
        if (curvesIdList.includes(curveData.id)) {
            setCurves(curves.filter((data) => data.id !== curveData.id));
        } else {
            setCurves([...curves, curveData]);
        }
    };

    const getRandomHexColor = () => {
        return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    };

    return (
        <div className="workspace bgColor2">
            <div className="titlePanel bgColor1">{t("Preview")}</div>
            <div className="generationViewPlotWrapper">
                <div className="panel bgColor1">
                    <ResponsiveContainer height={400}>
                        <LineChart data={formatData()}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {curves.map((curveData) => {
                                return (
                                    <Line
                                        type="basic"
                                        dataKey={curveData.name}
                                        dot={false}
                                        stroke={getRandomHexColor()}
                                        strokeWidth={3}
                                        key={curveData.id}
                                    />
                                );
                            })}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="panel bgColor1">
                    <div className="panelTitle">plot settings</div>

                    <FormControl>
                        <FormLabel>Approximation method</FormLabel>
                        <RadioGroup
                            defaultValue={0}
                            onChange={(event) =>
                                setApproximationFunction(
                                    approximationFunctions[event.target.value]
                                )
                            }
                        >
                            {approximationFunctions.map((data, index) => {
                                return (
                                    <FormControlLabel
                                        label={data.name}
                                        value={index}
                                        control={<Radio />}
                                        key={data.name}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </FormControl>

                    <NumberInput
                        placeholder=""
                        min={1}
                        value={chunkSize}
                        onChange={(event, val) => setChunkSize(val)}
                    />
                </div>

                <div className="panel bgColor1">
                    <div className="panelTitle">select curves</div>
                    {waveData.map((data) => {
                        return (
                            <div key={data.id}>
                                <input
                                    type="checkbox"
                                    id={data.id}
                                    value={data.value}
                                    onClick={() => handleCurveSelectionChange(data)}
                                />
                                <label htmlFor={data.id}>{data.name}</label>
                            </div>
                        );
                    })}
                </div>

                <div className="panel bgColor1">
                    <div className="panelTitle">select ranges</div>
                    <div>
                        <label htmlFor="rangeMin">minimal value</label>
                        <NumberInput
                            placeholder=""
                            id="rangeMin"
                            min={waveData[0].value[0].x}
                            max={rangeMax}
                            value={rangeMin}
                            onChange={(event, val) => setRangeMin(val)}
                        />
                    </div>
                    <div>
                        <label htmlFor="rangeMax">maximum value</label>
                        <NumberInput
                            placeholder=""
                            id="rangeMax"
                            min={rangeMin}
                            max={waveData[0].value[waveData[0].value.length - 1].x}
                            value={rangeMax}
                            onChange={(event, val) => setRangeMax(val)}
                        />
                    </div>
                </div>
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
