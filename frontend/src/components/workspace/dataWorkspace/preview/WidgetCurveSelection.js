const WidgetCurveSelection = ({curves, selectedCurves, setSelectedCurves}) => {
    const handleCurveSelectionChange = (curveData) => {
        const curvesIdList = selectedCurves.map((data) => data.id);
        if (curvesIdList.includes(curveData.id)) {
            setSelectedCurves(
                selectedCurves.filter((data) => data.id !== curveData.id)
            );
        } else {
            setSelectedCurves([...selectedCurves, curveData]);
        }
    };

    return (
        <div className="panel bgColor1">
            <div className="panelTitle">select curves</div>
            {curves.map((data) => {
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
    );
};

export default WidgetCurveSelection;
