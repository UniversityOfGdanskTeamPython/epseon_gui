import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {Unstable_NumberInput as NumberInput} from "@mui/base/Unstable_NumberInput";
import approximationFunctions from "./approximationMethods";

const WidgetPlotSettings = ({
    setApproximationFunction,
    approximationChunkSize,
    setApproximationChunkSize,
    rangeMin,
    rangeMax,
    displayRangeMin,
    displayRangeMax,
    setDisplayRangeMin,
    setDisplayRangeMax
}) => {
    return (
        <div className="panel bgColor1">
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
                value={approximationChunkSize}
                onChange={(event, val) => setApproximationChunkSize(val)}
            />

            <div className="panelTitle">select ranges</div>
            <div>
                <label htmlFor="rangeMin">minimal value</label>
                <NumberInput
                    placeholder=""
                    id="rangeMin"
                    min={rangeMin}
                    max={rangeMax}
                    value={displayRangeMin}
                    onChange={(event, val) => setDisplayRangeMin(val)}
                />
            </div>
            <div>
                <label htmlFor="rangeMax">maximum value</label>
                <NumberInput
                    placeholder=""
                    id="rangeMax"
                    min={rangeMin}
                    max={rangeMax}
                    value={displayRangeMax}
                    onChange={(event, val) => setDisplayRangeMax(val)}
                />
            </div>
        </div>
    );
};

export default WidgetPlotSettings;
