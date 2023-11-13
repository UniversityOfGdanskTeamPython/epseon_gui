import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import logo from "../../assets/logo.svg";
// import langIcon from "../../assets/lang.svg";
// import gearIcon from "../../assets/gear.svg";

const Topbar = ({theme, changeTheme}) => {
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

    return (
        <div className="topbar bgColor2">
            <div className="topbarContentWrapper">
                <img src={logo} alt="logo" className="bigIcon" />
                <div>Epseon</div>
            </div>
            <div className="topbarContentWrapper">
                {/* <img src={langIcon} alt="change language" className="smallIcon" /> */}
                {themeSwitch()}
                <FontAwesomeIcon icon="fa-solid fa-globe" className="mediumIcon" />
                <FontAwesomeIcon icon="fa-solid fa-gear" className="mediumIcon" />
                {/* <img src={gearIcon} alt="options" className="smallIcon" /> */}
            </div>
        </div>
    );
};

export default Topbar;
