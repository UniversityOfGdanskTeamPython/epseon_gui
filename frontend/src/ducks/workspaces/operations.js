import axios from "axios";
import store from "../store";
import {addOneWorkspace, addMultipleWorkspaces, deleteWorkspace} from "./actions";

const BACKEND_PORT = "http://localhost:5000";

export const addWorkspace = async (workspace) => {
    await axios
        .post(`${BACKEND_PORT}/workspaces`, workspace)
        .then((res) => {
            console.log(res);
            store.dispatch(addOneWorkspace(res));
        })
        .catch((err) => {
            window.alert(err.response.data);
            console.log(err);
        });
};

export const getWorkspacesFromApi = async () => {
    await axios
        .get(`${BACKEND_PORT}/workspaces`)
        .then((res) => {
            store.dispatch(addMultipleWorkspaces(res.data));
        })
        .catch((err) => {
            // window.alert("There was a problem with connecting to database (workspaces)")
            console.log(err);
            throw err;
        });
};

export const delWorkspace = async (id) => {
    await axios
        .delete(`${BACKEND_PORT}/workspaces/${id}`)
        .then((res) => {
            store.dispatch(deleteWorkspace(id));
        })
        .catch((err) => {
            window.alert(err.response.data);
            console.log(err);
        });
};
