/* eslint-disable react/prop-types */
import "../../assets/styles/readCardCSS/readCardCard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import biking from "/biking.png";
import running from "/running.png";
import swimming from "/swimming.png";
import cardio from "/cardio.png";
import walking from "/walking.png";

function Card({ data, fetchActivity }) {
  let backgroundColor = "";

  if (data.task === "complete") {
    backgroundColor = "#96d674";
  } else if (data.task === "inProgress") {
    backgroundColor = "#fff476";
  } else if (data.task === "fail") {
    backgroundColor = "#fd8888";
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this activity?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await axios.delete(
        "http://127.0.0.1:4000/activities/deleteActivity",
        {
          data: { _id: data._id },
        }
      );

      console.log(`delete: ${response.data}`);

      //reload the webpage after click delete
      fetchActivity();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="r-prevcard">
        {/* preview Image */}
        <div className="r-prevImg">
          <img src={data.img} className="r-img" />
        </div>

        {/* preview title */}
        <div className="r-container-text">
          <div className="r-prevTextbox">
            <p className="r-title-text">{data.title}</p>
          </div>
          {/* edit and delete icon */}
          <FontAwesomeIcon icon={faPenToSquare} className="r-faPenToSquare" />
          <FontAwesomeIcon
            icon={faTrashCan}
            className="r-faTrashCan"
            onClick={handleDelete}
          />

          {/* preview caption */}
          <div className="r-prevCaption">
            <p className="r-caption-text">{data.caption}</p>
          </div>

          {/* preview date */}
          <div className="r-prevDate">
            <p className="r-date-text">{data.date}</p>
          </div>
          {/* date icon */}
          <FontAwesomeIcon icon={faCalendar} className="r-faCalendar" />

          {/* preview duration */}
          <div className="r-prevDuration">
            {data.type === "biking" && (
              <img src={biking} className="r-icon-img" />
            )}
            {data.type === "running" && (
              <img src={running} className="r-icon-img" id="r-i-run" />
            )}
            {data.type === "swimming" && (
              <img src={swimming} className="r-icon-img-swimming" />
            )}
            {data.type === "cardio" && (
              <img src={cardio} className="r-icon-img" />
            )}
            {data.type === "walking" && (
              <img src={walking} className="r-icon-img" />
            )}
            <p className="r-duration-text">{data.duration}</p>
          </div>
        </div>

        {/* preview task status */}
        <div className="r-previewStatus" style={{ backgroundColor }}></div>
      </div>
    </>
  );
}

export default Card;
