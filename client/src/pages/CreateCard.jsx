import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authentication";
import { calcDuration } from "../utils/calcDuration";
import axios from "axios";

import Layout from "../components/Layout";
import PrevCard from "../components/cardComponents/createPrevCard";
import Form from "../components/cardComponents/createForm";
import SideContainer from "../components/cardComponents/sideContainer";
import "../assets/styles/cardCSS/createCard.css";



function CreateCard() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [task, setTask] = useState("");
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("no selected file");
  const [durationAlert, setDurationAlert] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [inputs, setInputs] = useState({
    title: "This is title",
    caption: "I wish I was a cat, no school, no work, no exercise, just meow meow meow meow meow",
    timeStart: "",
    timeEnd: "",
    duration: "0 h 0 m",
    date: "2023-03-18",
    task: "",
    type: "",
    img: "",
    userID: currentUser._id,
  });



  const handleCalcDuration = () => {
    setInputs(calcDuration(inputs));
  };

  let changeColor = (e) => {
    const color = ["#96d674", "#fff476", "#fd8888"];
    const { value } = e.target;
    if (value === "complete") {
      setTask(color[0]);
    }
    if (value === "inProgress") {
      setTask(color[1]);
    }
    if (value === "fail") {
      setTask(color[2]);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFilename(file.name);
      setImage(URL.createObjectURL(file));
      setInputs((prevInputs) => ({ ...prevInputs, img: file }));
    }
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(!isProcessing);

    if (inputs.duration === "0 h 0 m" || inputs.duration === " 0 m") {
      setDurationAlert(true);
      return;
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(inputs)) {
      formData.append(key, value);
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/activities/createActivityCard",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      navigate("/readcard");

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <Layout>
      <div className="create-card-container">
        <div className="bg">
          <SideContainer />
          <div className="container">
            <div className="head-sentence">
              <h1 className="firsttopic">Create Your Awesome Card</h1>
              <h2 className="secondtopic">Did You Meow Today?</h2>
              <h3 className="thirdtopic">Today's Workout</h3>
            </div>
            <PrevCard
              inputs={inputs}
              image={image}
              handleFileChange={handleFileChange}
              task={task}
              handleChangeInput={handleChangeInput}
            />
            <Form
              handleChangeInput={handleChangeInput}
              calcDuration={handleCalcDuration}
              changeColor={changeColor}
              handleFormSubmit={handleFormSubmit}
              durationAlert={durationAlert}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCard;