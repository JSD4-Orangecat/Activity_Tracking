import React, { useState } from "react";
import Layout from "../components/Layout";
// import { useForm } from "react-hook-form";
import "../assets/styles/Register.css";

function FormRegister() {
  //useStates and variables
  const [photo, setPhoto] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  let src;
  let preview;

  //use react hook form for validation
  // const { register, handleSubmit, errors } = useForm();

  // console.log({ userData });
  // const inputPhoto = (event) => {
  //   setPhoto(event.target.files[0]);
  //   if (event.target.files.length > 0) {
  //     src = URL.createObjectURL(event.target.files[0]);
  //     preview = document.getElementById("profilePhoto");
  //     preview.src = src;
  //     setSrcImg(event.target.preview.src);
  //   }
  // };

  // const inputPassword = (event) => {
  //   setPassword(event.target.value);
  //   // console.log({password})
  // };
  // const inputConfirmPassword = (event) => {
  //   setConfirmPassword(event.target.value);
  //   // console.log({confirmPassword})
  // };
  // const inputGender = (event) => {
  //   setGender(event.target.value);
  //   // console.log({gender})
  // };
  // const inputBirthDate = (event) => {
  //   setBirthDate(event.target.value);
  // };

  //set initial values
  const initialValues = {
    photo: "",
    name: "",
    birthDate: "",
    lastName: "",
    userName: "",
    weight: 0,
    height: 0,
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  };
  //   console.log(initialValues);
  const [formValues, setFormValues] = useState(initialValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

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
  let err = [];
  const saveInput = (event) => {
    event.preventDefault();
    err = validate(formValues);
    setFormErrors({ ...err });
    console.log(formErrors);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // if (!values.username) {
    //   errors.username = "Username is required!";
    // }
    if (!values.name) {
      errors.username = "Name is required!";
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
    } else if (values.password.length < 6) {
      errors.password = "Password must be more than 6 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Confirm Password is required";
    } else if (values.password !== values.confirmpassword) {
      errors.confirmpassword =
        "Confirm password should be the same as the password";
    }

    if (!values.birthdate) {
      errors.birthdate = "Birthdate Password is required";
      return errors;
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.height) {
      errors.height = "Height is required";
    }
    if (!values.weight) {
      errors.weight = "Weight is required";
    }
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
              <span className="red"> {formErrors.name}</span> <br />
              <br />
              <label>Last Name* :</label>
              <input
                onChange={handleChange}
                name="lastName"
                value={formValues.lastName}
                type="text"
                className="input"
              />
              <br />
              <span className="red"> {formErrors.lastname}</span>
              {/* <label>Username* :</label>
              <input
                onChange={handleChange}
                value={formValues.userName}
                name="userName"
                type="text"
                className="input"
              />
              <br />
              {formErrors.username}
              <br /> */}
              <label>
                Date Of Birth* :
                <input
                  onChange={handleChange}
                  value={formValues.birthDate}
                  name="birthDate"
                  type="date"
                  className="input"
                />
              </label>
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
              <br />
              <label>Email* :</label>
              <input
                onChange={handleChange}
                value={formValues.email}
                name="email"
                type="email"
                className="input"
              />
              <br />
              <label>Password* :</label>
              <input
                onChange={handleChange}
                value={formValues.password}
                name="password"
                type="password"
                className="input"
              />
              <br />
              <label>Confirm Password* :</label>
              <input
                onChange={handleChange}
                value={formValues.confirmPassword}
                name="confirmPassword"
                type="password"
                className="input"
              />
              <br />
            </div>
            <div className="radio">
              <input
                onChange={handleChange}
                value="male"
                name="genger"
                id="1"
                type="radio"
              />
              <label>Male</label>
              <input
                onChange={handleChange}
                type="radio"
                name="genger"
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
