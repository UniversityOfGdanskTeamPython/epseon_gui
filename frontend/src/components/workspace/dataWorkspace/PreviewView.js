import {connect} from "react-redux";
import {LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line} from "recharts";
import data from "../../../assets/wave_example.json";
import t from "../../../ducks/languages/operations";

const PreviewView = ({openWorkspaceId, workspaces}, props) => {
    const xTicks = [...Array(10).keys()].map((n) => data[(data.length * n) / 10]["x"]);
    console.log(xTicks);

    return (
        <div className="workspace bgColor2">
            <div className="titlePanel bgColor1">{t("Preview")}</div>
            <div className="panel bgColor1">
                <LineChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" tick={xTicks} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="basic"
                        dataKey="value"
                        dot={false}
                        stroke="#8884d8"
                        strokeWidth={3}
                    />
                </LineChart>
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
