import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";

library.add(fab, fas, far);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode> // TODO: reenable strict mode after adding cleanup to UseEffect
    <App />
    // </React.StrictMode>
);
