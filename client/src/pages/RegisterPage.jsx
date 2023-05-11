import React, { useState } from "react";
import Layout from "../components/Layout";

import "../assets/styles/Register.css";

function FormRegister() {
  //useStates and variables
  const [photo, setPhoto] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [userData, setUserData] = useState([]);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [birthDate, setBirthDate] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  let src;
  let preview;

  //use react hook form for validation

  console.log({ userData });
  const inputPhoto = (event) => {
    setPhoto(event.target.files[0]);
    if (event.target.files.length > 0) {
      src = URL.createObjectURL(event.target.files[0]);
      preview = document.getElementById("profilePhoto");
      preview.src = src;
      setSrcImg(event.target.preview.src);
    }
  };

  const inputName = (event) => {
    setName(event.target.value);
  };
  const inputLastName = (event) => {
    setLastName(event.target.value);
  };
  const inputUsername = (event) => {
    setUserName(event.target.value);
  };
  const inputHeight = (event) => {
    setHeight(event.target.value);
  };
  const inputWeight = (event) => {
    setWeight(event.target.value);
  };

  const inputEmail = (event) => {
    setEmail(event.target.value);
    // console.log({email})
  };
  const inputPassword = (event) => {
    setPassword(event.target.value);
    // console.log({password})
  };
  const inputConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    // console.log({confirmPassword})
  };
  const inputGender = (event) => {
    setGender(event.target.value);
    // console.log({gender})
  };
  const inputBirthDate = (event) => {
    setBirthDate(event.target.value);
  };
  const saveInput = (event) => {
    event.preventDefault();
    const data = {
      photo: photo,
      name: name,
      birthDate: birthDate,
      lastName: lastName,
      userName: userName,
      weight: weight,
      height: height,
      email: email,
      password: password,
      gender: gender,
    };
    // console.log({data})
    setUserData({ ...data });
    // console.log({ data });
    setPhoto("");
    setName("");
    setBirthDate("");
    setHeight(null);
    setWeight(null);
    setLastName("");
    setEmail("");
    setPassword(null);
    setConfirmPassword(null);
    setGender("");
  };
  return (
    <Layout>
      <section className="fullpage">
        <div className="left-form">
          <form className="form">
            <h1>Register</h1>
            <div className="wrap">
              <input onChange={inputPhoto} className="photo" type="file" />
              <img
                id="profilePhoto"
                src={srcImg}
                style={{ display: "inline" }}
              />
              <br />
            </div>
            <div className="allInform">
              <label>Name* :</label>
              <input
                onChange={inputName}
                value={name}
                type="text"
                className="input"
              />
              <br />
              <label>Last Name* :</label>
              <input
                onChange={inputLastName}
                value={lastName}
                type="text"
                className="input"
              />
              <br />

              <label>Username* :</label>

              <input
                onChange={inputUsername}
                value={userName}
                type="text"
                className="input"
              />
              <br />

              <label>
                Date Of Birth* :
                <input
                  onChange={inputBirthDate}
                  value="1997-07-07"
                  type="date"
                  className="input"
                />
              </label>
              <br />

              <label>
                Weight* :
                <input
                  onChange={inputWeight}
                  value={weight}
                  type="number"
                  className="input"
                />
                kg
              </label>
              <br />
              <label>
                Height* :
                <input
                  onChange={inputHeight}
                  value={height}
                  type="number"
                  className="input"
                />
                cm
              </label>
              <br />
              <label>Email* :</label>
              <input
                onChange={inputEmail}
                value={email}
                type="email"
                className="input"
              />
              <br />
              <label>Password* :</label>
              <input
                onChange={inputPassword}
                value={password}
                type="password"
                className="input"
              />
              <br />
              <label>Confirm Password* :</label>
              <input
                onChange={inputConfirmPassword}
                value={confirmPassword}
                type="password"
                className="input"
              />
              <br />
            </div>
            <div className="radio">
              <input onChange={inputGender} value="male" id="1" type="radio" />
              <label>Male</label>
              <input
                onChange={inputGender}
                type="radio"
                id="2"
                value="female"
              />
              <label>Female</label>
              <br />
            </div>
            <button onClick={saveInput} className="btn">
              SAVE
            </button>
          </form>
        </div>
        <div className="right">
          <img src="/public/mascot.png" />
        </div>
      </section>
    </Layout>
  );
}
export default FormRegister;
