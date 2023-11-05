import {useState} from "react";
import {Provider} from "react-redux";
import store from "./ducks/store";
import "./App.scss";
import Leftbar from "./components/leftbar/Leftbar";
import Topbar from "./components/topbar/Topbar";
import Workspace from "./components/workspace/Workspace";

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
                    <Workspace />
                </div>
            </div>
        </Provider>
    );
};

export default App;
