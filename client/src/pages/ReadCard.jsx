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

const pageLimit = 4

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
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(pageLimit)
  const [totalPages,setTotalPages] = useState(1)

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

  //for get method : activity data
  useEffect(() => {
    fetchActivity();
  }, [page,limit]);

  //for get method : activtiy data, use this inside useEffect
  const fetchActivity = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/activities", {
        params: {
          page,
          limit,
        }
      });
      setGetActivity(response.data.data);
      //Get total of document in database and calculate total pages.
      const {totalDocs} = response.data
      const totalPages = Math.ceil(totalDocs / limit)
      setTotalPages(totalPages)

    } catch (err) {
      console.error(err);
    }
  };
  console.log(getactivity);

  //link to create card page
  const handleButton = () => {
    navigate("/createcard");
  };

  //Handler page change function
  const handlerPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  const handlerNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }

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
            <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
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
          <FontAwesomeIcon onClick={handlerPrevPage} icon={faCircleLeft} className="faCircle" />
          <span>{page}</span>
          <FontAwesomeIcon onClick={handlerNextPage} icon={faCircleRight} className="faCircle" />
        </div>
      </main>
    </Layout>
  );
}

export default ReadCard;
