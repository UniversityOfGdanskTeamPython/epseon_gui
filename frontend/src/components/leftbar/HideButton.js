import arrowIcon from "../../assets/arrow.svg"

const HideButton = () => {
  return (
    <div className="leftbarElem bgColor1 hideButton">
      <div>hide</div>
      <img src={arrowIcon} alt="arrow" className="smallIcon" />
    </div>
  )
}

export default HideButton
