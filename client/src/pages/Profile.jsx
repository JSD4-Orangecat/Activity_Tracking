import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

import "../assets/styles/Register.css";

function Profile() {
  const [userData, setUserData] = useState({
    photo: "",
    name: "P",
    birthdate: "22,April,2000",
    lastname: "P",
    weight: 40,
    height: 140,
    email: "a@gmail.com",
    password: "xxxxxxx",
    gender: "female",
  });
  //handle function change input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log({ userData });
  };
  //function edit profile

  const handleEditProfile = (e) => {
    e.preventDefault();
  };
  //function delete profile
  const handleDeleteProfile = (e) => {
    e.preventDefault();
  };
  return (
    <Layout>
      <div className="allProfile">
        <section className="profilePicture">
          {/* <img
            id="profilePicture"
            src={srcImg}
            style={{ display: "inline" }}
          /> */}
          <br />
        </section>
        <section className="informationUser">
          <form>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={handleChange}
            />
            <br />
            <button onClick={handleEditProfile}>Edit</button>
            <button onClick={handleDeleteProfile}>Delete</button>
          </form>
        </section>
        <section className="contact"></section>
      </div>
    </Layout>
  );
}
export default Profile;
