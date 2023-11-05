import types from "./types";
import storeInit from "../storeInitData.json";

const workspacesReducer = (
    state = {workspaces: storeInit.workspaces, openWorkspace: null},
    action
) => {
    switch (action.type) {
        case types.ADD_WORKSPACE:
            return {...state, workspaces: [...state.workspaces, action.payload]};
        case types.ADD_MULTIPLE_WORKSPACES:
            return {...state, workspaces: [...state.workspaces, ...action.payload]};
        case types.DELETE_WORKSPACE:
            return {
                ...state,
                workspaces: state.workspaces.filter((workspace) => {
                    return workspace.id === action.payload ? false : true;
                }),
                openWorkspace:
                    state.openWorkspace.id === action.payload.id
                        ? state.openWorkspace
                        : null
            };
        case types.SET_CURRENT_WORKSPACE:
            return {
                ...state,
                openWorkspace: action.payload
            };
        default:
            return state;
    }
};

export default workspacesReducer;
