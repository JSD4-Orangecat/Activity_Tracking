/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import SideContainer from "../components/sideContainer";
import EditPrevCard from "../components/editPrevCard";
import EditForm from "../components/editForm";
import axios from "axios";

function EditCard() {
 
  const navigate = useNavigate()
  const { id } = useParams()
  console.log({ id })

  const [task, setTask] = useState("");
  const [image, setImage] = useState(null);
  const [durationAlert, setDurationAlert] = useState(false);
 
  // eslint-disable-next-line no-unused-vars
  const [inputs, setInputs] = useState({
    title: "",
    caption: "",
    time_start: "",
    time_end: "",
    duration: "",
    date: "",
    task: "",
    type: "",
    img: "",
  });

  function calcDuration() {
    let tStart = inputs.time_start;
    let tEnd = inputs.time_end;
    // console.log(tStart, tEnd);

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

  console.log(inputs);

  function handleFileChange(e) {
    const file = e.target.files[0];
        const image = URL.createObjectURL(file)
        setImage(image)
    
        setInputs((prevInputs) => ({ 
          ...prevInputs,
          img: file, 
        }));
      }

      useEffect(() => {
        fetchActivity()
      },[])
    
      console.log(inputs)
      
      const fetchActivity = async () => {
        try {
          const res = await axios.get("http://127.0.0.1:4000/activities/" + id)
          console.log(res.data)
    
          const taskColor = {
            complete: "#96d674",
            inProgress: "#fff476",
            fail: "#fd8888",
          }; 
    
          setInputs({
            ...inputs,
            title:res.data.title,
            caption:res.data.caption,
            time_start:res.data.timeStart,
            time_end:res.data.timeEnd,
            duration:res.data.duration,
            date:res.data.date,
            task:res.data.task,
            type:res.data.type,
            img:res.data.img,
          });
    
          setTask(taskColor[res.data.task])
        } catch (err) {
          console.error(err);
        }
      };
    
      // console.log(inputs)

      const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        if (inputs.duration === "0 h 0 m" || inputs.duration === " 0 m") {
          setDurationAlert(true);
          return;
        }
        // console.log(inputs)


        const formData = new FormData();
        for (const [key, value] of Object.entries(inputs)) {
          formData.append(key, value);
        }
    
        try {
          const response = await axios.put(
            `http://127.0.0.1:4000/activities/updatecard/${id}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          // console.log("Hooooooeqwe")
        
          navigate("/readcard");
        } catch(error) {
          console.log(error)
        }
        }
        
        const handleCancel = async (e) => {
          navigate("/readcard")
          }

  return (
    <Layout>
      <div className="create-card-container">
        <div className="bg">
          <SideContainer />
          <div className="container">
            <div className="head-sentence">
              <h1 className="firsttopic">Edit Your Awesome Card</h1>
              <h2 className="secondtopic">Did You Meow Today?</h2>
              <h3 className="thirdtopic">Today's Workout</h3>
            </div>
            {/* card */}
            <EditPrevCard
              inputs={inputs}
              image={image}
              handleFileChange={handleFileChange}
              task={task}
              handleChangeInput={handleChangeInput}
            />
            {/* form */}
            <EditForm
              handleChangeInput={handleChangeInput}
              calcDuration={calcDuration}
              changeColor={changeColor}
              inputs={inputs}
              handleFormSubmit={handleFormSubmit}
              durationAlert={durationAlert}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditCard;
