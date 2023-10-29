import logo from "../../assets/logo.svg"

const Topbar = ({ changeTheme }) => {
  return (
    <div className="topbar bgColor2">
      <div className="topbarContentWraper">
        <img src={logo} alt="logo" className="mediumIcon" />
        <div>PEC framework</div>
      </div>
      <div className="topbarContentWraper">
        <button
          onClick={() => {
            changeTheme()
          }}>
          Theme changer
        </button>
        <div>lang changer</div>
      </div>
    </div>
  )
}

export default Topbar
