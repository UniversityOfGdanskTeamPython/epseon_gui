import types from "./types";

export const addOneWorkspace = (payload) => ({
    type: types.ADD_WORKSPACE,
    payload
});

export const addMultipleWorkspaces = (payload) => ({
    type: types.ADD_MULTIPLE_WORKSPACES,
    payload
});

export const deleteWorkspace = (payload) => ({
    type: types.DELETE_WORKSPACE,
    payload
});

export const setCurrentWorkspace = (payload) => ({
    type: types.SET_CURRENT_WORKSPACE,
    payload
});
