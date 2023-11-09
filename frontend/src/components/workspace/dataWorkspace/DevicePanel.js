import {connect} from "react-redux";

const DevicePanel = ({devices}, props) => {
    const deviceCard = (deviceData) => {
        const objectEntries = Object.entries(deviceData);
        console.log(objectEntries);
        return (
            <div className="deviceCard">
                <div>select</div>
                <div className="smallText">
                    {objectEntries.map((entry) => deviceCardField(entry[0], entry[1]))}
                </div>
            </div>
        );
    };

    const deviceCardField = (key, val) => {
        if (typeof val === "object") {
            const valueEntries = Object.entries(val);
            return (
                <div key={key}>
                    <div>{key}:</div>
                    <div>
                        {valueEntries.map((entry) => (
                            <div key={entry[0]}>
                                {entry[0]} - {entry[1]}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div key={key}>
                {key}: {val}
            </div>
        );
    };

    return (
        <div className="panel bgColor1">
            <div className="panelTitle">Select device</div>
            <div className="deviceCardWrapper">
                {devices.map((device) => deviceCard(device))}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {devices: state.devicesReducer.devices};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DevicePanel);
