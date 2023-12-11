import types from "./types";
import storeInit from "../storeInitData.json";

const devicesReducer = (state = {devices: storeInit.devices}, action) => {
    switch (action.type) {
        case types.SET_DEVICES:
            return {...state, devices: [...action.payload]};
        default:
            return state;
    }
};

export default devicesReducer;
