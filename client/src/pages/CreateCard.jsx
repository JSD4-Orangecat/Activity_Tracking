import "../assets/styles/createCard.css";
import { useState } from "react";
import Layout from "../components/Layout";
import PrevCard from "../components/createPrevCard";
import Form from "../components/createForm";
import SideContainer from "../components/sideContainer";
import { useAuth } from "../contexts/authentication";
import axios from 'axios'

function CreateCard() {
  const { currentUser } = useAuth();
  console.log(currentUser)

  const [task, setTask] = useState("");
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("no selected file");
  const [inputs, setInputs] = useState({
    title: "This is title",
    caption:
      "I wish I was a cat, no school, no work, no exercise, just meow meow meow meow meow",
    timeStart: "",
    timeEnd: "",
    duration: "1 h 30 m",
    date: "2023-03-18",
    task: "",
    type: "",
    img: "",
    userID: currentUser._id
  });

  function calcDuration() {
    let tStart = inputs.timeStart;
    let tEnd = inputs.timeEnd;
    

    //convert timeStart and timeEnd to milliseconds
    let milliseconds1 =
      Number(tStart.split(":")[0]) * 60 * 60 * 1000 +
      Number(tStart.split(":")[1]) * 60 * 1000;
    let milliseconds2 =
      Number(tEnd.split(":")[0]) * 60 * 60 * 1000 +
      Number(tEnd.split(":")[1]) * 60 * 1000;
    // console.log(milliseconds1, milliseconds2);

    //find differences in milliseconds
    let difference = Math.abs(milliseconds2 - milliseconds1);
    if (milliseconds2 < milliseconds1) {
      difference = 86400000 - difference;
    }
    // console.log(difference)

    let msec = difference;
    let hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    //console.log('hh ' + hh);
    //console.log('hh ' + msec);
    let mm = Math.floor(msec / 1000 / 60);
    //console.log('mm1 ' + mm);
    msec -= mm * 1000 * 60;
    //console.log('mm2 ' + msec);
    let ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    // console.log(hh + ":" + mm + ":" + ss);

    //prepare to display in preview card
    let displayHour = hh + " h";
    let displayMin = mm + " m";
    // console.log(displayHour, displayMin)

    let hour;
    let min;
    if (hh === 0) {
      hour = "";
      min = displayMin;
    } else if (mm === 0) {
      hour = displayHour;
      min = "";
    } else if (hh > 0 && mm > 0) {
      hour = displayHour;
      min = displayMin;
    } else {
      hour = "0 h";
      min = "0 m";
    }
    let calculateDuration = `${hour} ${min}`;
    setInputs({ ...inputs, duration: calculateDuration });
  }

  let changeColor = (e) => {
    const color = ["#96d674", "#fff476", "#fd8888"];
    const { value } = e.target;
    if (value == "complete") {
      //console.log('you click green')
      setTask(color[0]);
    }
    if (value == "inProgress") {
      //console.log('you click yellow')
      setTask(color[1]);
    }
    if (value == "fail") {
      // console.log('you click red')
      setTask(color[2]);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    //console.log({...inputs})
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:4000/activities/createActivityCard', inputs);
      console.log(response)
      // reset activity state after successful post
      setInputs({
        title: '',
        date: '',
        type: '',
        timeStart: '',
        timeEnd: '',
        duration: '',
        caption: '',
        img: ''
      });
    } catch (error) {
      console.log(error);
    }
  };



  console.log(inputs);

  function handleFileChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setFilename(file.name);
      setImage(URL.createObjectURL(file));
      handleChangeInput({ target: { name: "img", value: file } });
    }
  }

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
              calcDuration={calcDuration}
              changeColor={changeColor}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCard;
