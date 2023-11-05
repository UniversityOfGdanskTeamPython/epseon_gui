import types from "./types";
import PL from "./PL.json";

const languagesReducer = (
    state = {language: "ENG", dictionary: {}, languages: {ENG: {}, PL}},
    action
) => {
    switch (action.type) {
        case types.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload,
                dictionary: state.languages[action.payload]
            };
        default:
            return state;
    }
};

export default languagesReducer;
