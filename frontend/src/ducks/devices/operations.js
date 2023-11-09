import axios from "axios";
import store from "../store";
import {setDevices} from "./actions";
import {BACKEND_PORT} from "../../../.env";

export const getDevices = async () => {
    await axios
        .get(`${BACKEND_PORT}/devices`)
        .then((res) => {
            store.dispatch(setDevices(res.data));
        })
        .catch((err) => {
            window.alert(err.response.data);
            console.log(err);
        });
};
