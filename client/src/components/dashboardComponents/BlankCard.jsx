/* eslint-disable react/prop-types */
import "../../assets/styles/readCardCSS/readCardCard.css";
import biking from "/biking.png";
import running from "/running.png";
import swimming from "/swimming.png";
import cardio from "/cardio.png";
import walking from "/walking.png";

function BlankCard({ data }) {
    let backgroundColor = "";

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

                    {/* preview caption */}
                    <div className="r-prevCaption">
                        <p className="r-caption-text">{data.caption}</p>
                    </div>

                    {/* preview date */}
                    <div className="r-prevDate">
                        <p className="r-date-text">{data.date}</p>
                    </div>

                    {/* preview duration */}
                    <div className="r-prevDuration">
                        <p className="r-duration-text">{data.duration}</p>
                    </div>
                </div>

                {/* preview task status */}
                <div className="r-previewStatus" style={{ backgroundColor }}></div>
            </div>
        </>
    );
}

export default BlankCard;