import {connect} from "react-redux";
import t from "../../../../ducks/languages/operations";

const Form = ({title, fieldsData, isDisabled}, props) => {
    const field = (label, value, setter) => {
        return (
            <div className="formInput" key={label}>
                <label>{t(label)}</label>
                <input
                    type="number"
                    value={value}
                    onChange={(event) => {
                        setter(event.target.value);
                    }}
                    disabled={isDisabled}
                />
            </div>
        );
    };

    return (
        <div className="panel bgColor1">
            <div className="panelTitle">{t(title)}</div>
            {fieldsData.map(({label, value, setter}) => field(label, value, setter))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.languagesReducer.language
    };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
