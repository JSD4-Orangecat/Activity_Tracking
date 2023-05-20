import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";

import "../assets/styles/Register.css";
import { useNavigate } from "react-router";

function Profile() {
  const [userData, setUserData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  //function fetch data

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:4000/auth/profile");
      setUserData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // fetchData();
  useEffect(() => {
    fetchData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };
  //function save update of profile
  console.log(userData);
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    setFormErrors(validate(userData));
    //check errors before making the axios request
    if (Object.keys(formErrors).length === 0) {
      const { name, value } = e.target;
      // const { confirmpassword, ...Data } = formValues;
      setUserData({ ...userData, [name]: value });
      console.log(userData);
      console.log("no errors");
      try {
        const response = await axios.put(
          "http://127.0.0.1:4000/auth/profile",
          userData
        );

        console.log(response.data);
        navigate("/dashboard"); // navigate to the dashboard
      } catch (err) {
        console.log(err);
      }
    }
  };
  //function delete profile
  const handleDeleteProfile = async () => {
    const deleteUser = confirm("Are you sure you want to delete this account?");
    if (!deleteUser) {
      return;
    }
    try {
      const response = await axios.delete("http://127.0.0.1:4000/auth/profile");

      console.log(`res: ${response.data}`);
      navigate("/"); // navigate to home page
    } catch (error) {
      console.log(error);
    }
  };

  //function for validate user data
  const validate = (values) => {
    const errors = {};

    const regexEmail =
      /^(?=.*[a-z])[a-z0-9._%+-]+@(?:gmail|hotmail|yahoo)\.[a-z]{2,}$/i;
    const currentDate = new Date();
    console.log({ currentDate });
    const BirthDate = new Date(values.birthDate);
    console.log({ BirthDate });
    console.log(values.birthDate);
    // Calculate age
    const age = currentDate.getFullYear() - BirthDate.getFullYear();
    console.log({ age });
    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regexEmail.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.birthDate) {
      errors.birthDate = "Birthdate is required";
    } else if (BirthDate > currentDate) {
      errors.birthDate = "Birthdate cannot refer to a future date";
    } else if (age < 7) {
      errors.birthDate = "Age must be more than 7 years";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.height) {
      errors.height = "Height is required";
    } else if (values.height <= 0) {
      errors.height = "Height must be a  positive number";
    }
    if (!values.weight) {
      errors.weight = "Weight is required";
    } else if (values.weight <= 0) {
      errors.weight = "Weight must be a  positive number";
    }

    return errors;
  };
  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <Layout>
      <div className="allProfile">
        <section className="informationUser">
          <form className="form">
            <h1>Profile</h1>
            <div className="wrap">
              <input
                onChange={handleChange}
                value={userData.picture}
                name="picture"
                className="photo"
                type="file"
              />
              {/* <img
                id="profilePhoto"
                src={srcImg}
                style={{ display: "inline" }}
              /> */}
              <br />
            </div>
            <div className="allInform">
              <label className="labelInput">First Name* :</label>
              <br />
              <input
                type="text"
                id="firstname"
                value={userData.firstName}
                onChange={handleChange}
                name="firstName"
                className="input"
              />
              <span className="texterr"> {formErrors.firstName}</span>
              <br />
              <label className="labelInput">Last Name* :</label> <br />
              <input
                onChange={handleChange}
                name="lastName"
                value={userData.lastName}
                type="text"
                className="input"
              />
              <span className="texterr"> {formErrors.lastName}</span>
              <br />
              <label className="labelInput">Date Of Birth* :</label>
              <br />
              <input
                onChange={handleChange}
                value={userData.birthDate}
                name="birthDate"
                type="date"
                className="input"
              />
              <span className="texterr"> {formErrors.birthDate}</span>
              <br />
              <label className="labelInput">Weight* :</label>
              <br />
              <input
                onChange={handleChange}
                value={userData.weight}
                name="weight"
                type="number"
                className="input"
                placeholder=" kg"
              />
              <span className="texterr"> {formErrors.weight}</span>
              <br />
              <label className="labelInput">Height* : </label>
              <br />
              <input
                onChange={handleChange}
                value={userData.height}
                name="height"
                type="number"
                className="input"
                placeholder=" cm"
              />
              <span className="texterr"> {formErrors.height}</span>
              <br />
              <label className="labelInput">Email* :</label>
              <br />
              <input
                onChange={handleChange}
                value={userData.email}
                name="email"
                type="email"
                className="input"
              />
              <span className="texterr"> {formErrors.email}</span>
              <br />
              {/* <label className="labelInput" display="none">
                Password* :
              </label>
              <br />
              <input
                onChange={handleChange}
                value={userData.password}
                name="password"
                type="password"
                className="input"
              />
              <span className="texterr"> {formErrors.password}</span>
              <br />
              <label className="labelInput">Confirm Password* :</label>
              <br />
              <input
                onChange={handleChange}
                value={userData.confirmpassword}
                name="confirmpassword"
                type="password"
                className="input"
              />
              <span className="texterr"> {formErrors.confirmpassword}</span>
              <br /> */}
            </div>
            <div className="radio">
              <input
                onChange={handleChange}
                value="male"
                name="gender"
                id="1"
                type="radio"
                checked={userData.gender === "male"}
                className="selctor"
              />
              <label>Male</label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                id="2"
                value="female"
                checked={userData.gender === "female"}
                className="selctor"
              />
              <label>Female</label>
            </div>
            <span className="texterr"> {formErrors.gender}</span>
            <br />
            <div className="allBtn">
              <button onClick={handleUpdateProfile} className="btn">
                Update
              </button>
              <button onClick={handleDeleteProfile} className="btn">
                Delete
              </button>
            </div>
          </form>
        </section>
        <section className="contact"></section>
      </div>
    </Layout>
  );
}
export default Profile;
