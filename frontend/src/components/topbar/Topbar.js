import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {connect} from "react-redux";
import {setLanguage} from "../../ducks/languages/actions";
import logo from "../../assets/logo.svg";

const Topbar = ({theme, changeTheme, language, setLanguage}) => {
    const themeSwitch = () => {
        if (theme === "darkTheme") {
            return (
                <FontAwesomeIcon
                    icon="fa-solid fa-moon"
                    className="mediumIcon"
                    onClick={() => changeTheme()}
                />
            );
        }
        return (
            <FontAwesomeIcon
                icon="fa-solid fa-sun"
                className="mediumIcon"
                onClick={() => changeTheme()}
            />
        );
    };

    const languageSwitch = () => {
        const nextLanguage = language === "ENG" ? "PL" : "ENG";

        return (
            <FontAwesomeIcon
                icon="fa-solid fa-globe"
                className="mediumIcon"
                onClick={() => setLanguage(nextLanguage)}
            />
        );
    };

    return (
        <div className="topbar bgColor2">
            <div className="topbarContentWrapper">
                <img src={logo} alt="logo" className="bigIcon" />
                <div>Epseon</div>
            </div>
            <div className="topbarContentWrapper">
                {/* <img src={langIcon} alt="change language" className="smallIcon" /> */}
                {themeSwitch()}
                {languageSwitch()}
                <FontAwesomeIcon icon="fa-solid fa-gear" className="mediumIcon" />
                {/* <img src={gearIcon} alt="options" className="smallIcon" /> */}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.languagesReducer.language
    };
};

const mapDispatchToProps = {
    setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
