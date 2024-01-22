import types from "./types";
import storeInit from "../storeInitData.json";

const workspacesReducer = (
    state = {workspaces: storeInit.workspaces, openWorkspaceId: null},
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
                    return workspace.workspace_id === action.payload ? false : true;
                }),
                openWorkspaceId:
                    state.openWorkspaceId === action.payload
                        ? null
                        : state.openWorkspaceId
            };
        case types.SET_CURRENT_WORKSPACE:
            return {
                ...state,
                openWorkspaceId: action.payload
            };
        default:
            return state;
    }
};

export default workspacesReducer;
