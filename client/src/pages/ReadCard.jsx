import "../assets/styles/readCardCSS/readCard.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import CoverImage from "../components/readCardComponents/readCardCoverImage";
import CallOut from "../components/readCardComponents/readCardCallOut";
import SocialMedia from "../components/readCardComponents/readCardSocialmedia";
import axios from "axios";
import Card from "../components/readCardComponents/readCardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleLeft,
  faCircleRight,
} from "@fortawesome/free-regular-svg-icons";

function ReadCard() {
  const navigate = useNavigate();

  const [cover, setCover] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [filename, setFilename] = useState("no selected file");
  const [pickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);
  const [getactivity, setGetActivity] = useState([]);
  const [rcInputs, setRcInputs] = useState({
    quote: "",
    emoji: "",
    cover: "",
  });

  const showPicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const pickEmoji = (e) => {
    setCurrentEmoji(e.native);
    setPickerVisible(!pickerVisible);
    setRcInputs((prevRcInputs) => ({ ...prevRcInputs, emoji: e.native }));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    //console.log(e.target.value)
    setRcInputs((prevRcInputs) => ({ ...prevRcInputs, [name]: value }));
    //console.log({...callOut})
  };
  console.log(rcInputs);

  function handleFileChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFilename(file.name);
      setCover(URL.createObjectURL(file));
      handleChangeInput({ target: { name: "cover", value: file } });
    }
  }

  const handleButton = () => {
    navigate("/createcard");
  };

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/activities");
        setGetActivity(response.data.data);
        // console.log(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivity();
  }, []);

  console.log(getactivity);

  return (
    <Layout>
      <main className="bg-readcard">
        <div className="r-coverimage">
          <CoverImage cover={cover} handleFileChange={handleFileChange} />
        </div>
        <div className="r-callout">
          <CallOut
            handleChangeInput={handleChangeInput}
            showPicker={showPicker}
            pickEmoji={pickEmoji}
            pickerVisible={pickerVisible}
            currentEmoji={currentEmoji}
          />
        </div>
        <div className="r-socialmedia">
          <SocialMedia />
        </div>

        <div className="r-card">
          {getactivity.map((ele) => (
            <Card key={ele._id} data={ele} />
          ))}
        </div>

        {/* submit button */}
        <input
          type="submit"
          value="Create new card"
          className="r-btn-create"
          onClick={handleButton}
        ></input>

        {/* page */}
        <div className="r-page">
          <FontAwesomeIcon icon={faCircleLeft} className="faCircle" />
          <span>2</span>
          <FontAwesomeIcon icon={faCircleRight} className="faCircle" />
        </div>
      </main>
    </Layout>
  );
}

export default ReadCard;
