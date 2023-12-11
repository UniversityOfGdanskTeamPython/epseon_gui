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

const WidgetPlot = ({
    selectedCurves,
    displayRangeMax,
    displayRangeMin,
    approximationChunkSize,
    approximationFunction
}) => {
    const formatData = () => {
        const plotData = [];
        const [startingIndex, endingIndex] = getBoundaryDataIndexes(selectedCurves);

        for (let i = startingIndex; i < endingIndex; i++) {
            const curvesData = {x: selectedCurves[0].value[i].x};
            for (const curve of selectedCurves) {
                curvesData[curve.name] = curve.value[i].y;
            }
            plotData.push(curvesData);
        }

        const approximatedData = approximateData(plotData);

        return approximatedData;
    };

    const getBoundaryDataIndexes = (selectedCurves) => {
        const xValues = selectedCurves[0].value.map((values) => values.x);
        const startingIndex = xValues.filter((x) => x < displayRangeMin).length;
        const endingIndex = xValues.filter((x) => x <= displayRangeMax).length;

        return [startingIndex, endingIndex];
    };

    const approximateData = (data) => {
        if (approximationChunkSize === 1) {
            return data;
        }
        const approximatedData = [];

        for (let i = 0; i < data.length; i += approximationChunkSize) {
            const dataChunk = data.slice(i, i + approximationChunkSize);
            const approximatedValue = approximationFunction.function(dataChunk);
            approximatedData.push(approximatedValue);
        }
        return approximatedData;
    };

    const getRandomHexColor = () => {
        return "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
    };

    if (selectedCurves.length === 0) {
        return (
            <div className="panel bgColor1">select curves to display them on plot</div>
        );
    }
    return (
        <div className="panel bgColor1">
            <ResponsiveContainer height={400}>
                <LineChart data={formatData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {selectedCurves.map((curveData) => {
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
    );
};

export default WidgetPlot;
