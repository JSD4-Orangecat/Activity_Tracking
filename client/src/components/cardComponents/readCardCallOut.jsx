/* eslint-disable react/prop-types */
import "../../assets/styles/cardCSS/readCardCallout.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";

function CallOut({
  handleChangeInput,
  showPicker,
  pickEmoji,
  pickerVisible,
  currentEmoji,
  quote,
  // handleKeyDown,
  handleOnBlur,
  handleEmoji,
}) {
  return (
    <main className="emojiContainer">
      <div className="emoji-allcontainer">
        <div className="emoji-subcontainer">
          <h3 className="displayEmoji">{currentEmoji}</h3>

          <textarea
            className="textarea"
            name="quote"
            onChange={handleChangeInput}
            onBlur={handleOnBlur}
            placeholder="Got a quote that inspires you to keep pushing? tell us here!"
            defaultValue={quote}
          />
        </div>
        <FontAwesomeIcon
          icon={faFaceSmile}
          className="fa-facesmile"
          onClick={showPicker}
        />
        <div
          style={{ display: pickerVisible ? "block" : "none" }}
          className="emoji-picker"
        >
          <Picker
            data={data}
            previewPosition="none"
            onEmojiSelect={pickEmoji}
          />
        </div>
      </div>
      <div className="callout-line"></div>
    </main>
  );
}

export default CallOut;
