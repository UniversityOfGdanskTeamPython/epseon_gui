import HideButton from "./HideButton"
import OptionsButton from "./OptionsButton"

const Leftbar = () => {
  return (
    <div className="leftbar bgColor3">
      <div>Leftbar</div>
      <div className="elemWraper">
        <HideButton />
        <OptionsButton />
      </div>
    </div>
  )
}

export default Leftbar
