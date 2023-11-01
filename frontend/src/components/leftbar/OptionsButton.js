import gearIcon from "../../assets/gear.svg";

const OptionsButton = () => {
  return (
    <div className="leftbarElem bgColor1 optionsButton">
      <div>options</div>
      <img src={gearIcon} alt="gear" className="smallIcon" />
    </div>
  );
};

export default OptionsButton;
