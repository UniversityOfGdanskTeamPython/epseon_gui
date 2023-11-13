import {useState} from "react";
import {Provider} from "react-redux";
import store from "./ducks/store";
import "./App.scss";
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
                <Topbar theme={theme} changeTheme={changeTheme} />
                <WorkspaceWrapper />
            </div>
        </Provider>
    );
};

export default App;
