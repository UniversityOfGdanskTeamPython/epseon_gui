import logo from "../../assets/logo.svg";

const Topbar = ({ changeTheme }) => {
    return (
        <div className="topbar bgColor2">
            <div className="topbarContentWrapper">
                <img src={logo} alt="logo" className="mediumIcon" />
                <div>PEC framework</div>
            </div>
            <div className="topbarContentWrapper">
                <button
                    onClick={() => {
                        changeTheme();
                    }}
                >
                    Theme changer
                </button>
                <div>lang changer</div>
            </div>
        </div>
    );
};

export default Topbar;
