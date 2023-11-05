import store from "../store";

const t = (props) => {
    return store.getState().languagesReducer.dictionary[props]
        ? store.getState().languagesReducer.dictionary[props]
        : props;
};

export default t;
