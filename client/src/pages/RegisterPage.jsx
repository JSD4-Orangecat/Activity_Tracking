import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";

import "../assets/styles/Register.css";

function FormRegister() {
  //useStates and variables
  const [userData, setUserData] = useState({});
  const [srcImg, setSrcImg] = useState(null);

  //set initial values
  const initialValues = {
    photo: "",
    name: "",
    birthdate: "",
    lastname: "",
    weight: null,
    height: null,
    email: "",
    password: "",
    confirmpassword: "",
    gender: "",
  };
  // all useState
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  //function to handle change in input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (e.target.files.length > 0) {
      const src = URL.createObjectURL(e.target.files[0]);
      const preview = document.getElementById("profilePhoto");
      preview.src = src;
      setSrcImg(src);
    }
  };
  console.log(formValues);
  // fuction to handle save inputs
  const saveInput = (event) => {
    event.preventDefault();
    setFormErrors(validate(formValues));
    console.log(formErrors);
    setIsSubmit(true);
  };
  // useEffect for watching errors in this form
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);

      setUserData(formValues);
    }
  }, [formErrors]);

  console.log(userData);
  //function for validate user data
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!regexPassword.test(values.password)) {
      errors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and six number";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword =
        "Confirm password should be the same as the password";
    }

    if (!values.birthdate) {
      errors.birthdate = "Birthdate is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.height) {
      errors.height = "Height is required";
    } else if (values.height < 0) {
      errors.height = "Height must be a  positive number";
    }
    if (!values.weight) {
      errors.weight = "Weight is required";
    } else if (values.weight < 0) {
      errors.weight = "Weight must be a  positive number";
    }

    return errors;
  };

  return (
    <Layout>
      <section className="fullpage">
        <div className="left-form">
          <form className="form">
            <h1>Register</h1>
            <div className="wrap">
              <input
                onChange={handleChange}
                value={formValues.photo}
                name="photo"
                className="photo"
                type="file"
              />
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
                onChange={handleChange}
                name="name"
                value={formValues.name}
                type="text"
                className="input"
              />

              <span className="texterr"> {formErrors.name}</span>
              <br />
              <label>Last Name* :</label>
              <input
                onChange={handleChange}
                name="lastname"
                value={formValues.lastname}
                type="text"
                className="input"
              />

              <span className="texterr"> {formErrors.lastname}</span>
              <br />
              <label>
                Date Of Birth* :
                <input
                  onChange={handleChange}
                  value={formValues.birthdate}
                  name="birthdate"
                  type="date"
                  className="input"
                />
              </label>

              <span className="texterr"> {formErrors.birthdate}</span>
              <br />
              <label>
                Weight* :
                <input
                  onChange={handleChange}
                  value={formValues.weight}
                  name="weight"
                  type="number"
                  className="input"
                />
                kg
              </label>
              <span className="texterr"> {formErrors.weight}</span>
              <br />

              <label>
                Height* :
                <input
                  onChange={handleChange}
                  value={formValues.height}
                  name="height"
                  type="number"
                  className="input"
                />
                cm
              </label>
              <span className="texterr"> {formErrors.height}</span>
              <br />
              <label>Email* :</label>
              <input
                onChange={handleChange}
                value={formValues.email}
                name="email"
                type="email"
                className="input"
              />
              <span className="texterr"> {formErrors.email}</span>
              <br />
              <label>Password* :</label>
              <input
                onChange={handleChange}
                value={formValues.password}
                name="password"
                type="password"
                className="input"
              />
              <span className="texterr"> {formErrors.password}</span>
              <br />
              <label>Confirm Password* :</label>
              <input
                onChange={handleChange}
                value={formValues.confirmpassword}
                name="confirmpassword"
                type="password"
                className="input"
              />
              <span className="texterr"> {formErrors.confirmpassword}</span>
              <br />
            </div>
            <div className="radio">
              <input
                onChange={handleChange}
                value="male"
                name="gender"
                id="1"
                type="radio"
                checked={formValues.gender === "male"}
                className="selctor"
              />
              <label for="1">Male</label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                id="2"
                value="female"
                checked={formValues.gender === "female"}
                className="selctor"
              />
              <label for="2">Female</label>
            </div>
            <span className="texterr"> {formErrors.gender}</span>
            <br />
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
