import {useState} from "react";
import {Provider} from "react-redux";
import store from "./ducks/store";
import "./App.scss";
import Leftbar from "./components/leftbar/Leftbar";
import Topbar from "./components/topbar/Topbar";
import WorkspaceWrapper from "./components/workspace/WorkspaceWrapper";

const App = () => {
    const [theme, setTheme] = useState("darkTheme");
    const changeTheme = () => {
        theme === "darkTheme" ? setTheme("lightTheme") : setTheme("darkTheme");
    };

    return (
        <Provider store={store}>
            <div className={`app ${theme}`}>
                <Topbar changeTheme={changeTheme} />
                <div className="appContent">
                    <Leftbar />
                    <WorkspaceWrapper />
                </div>
            </div>
        </Provider>
    );
};

export default App;
