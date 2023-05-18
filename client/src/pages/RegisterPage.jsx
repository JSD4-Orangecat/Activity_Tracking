import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import "../assets/styles/Register.css";

// import { useNavigate } from "react-router";
function FormRegister() {
  //useStates and variables
  //const [userData, setUserData] = useState({});

  // const navigate = useNavigate();
  //set initial values
  const initialValues = {
    email: "",
    password: "",
    confirmpassword: "",
    picture: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    weight: null,
    height: null,
  };
  // all useState
  const [formValues, setFormValues] = useState(initialValues);
  const [srcImg, setSrcImg] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isClick, setIsClick] = useState(false);

  //function to handle change in input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({ ...formValues, [name]: value });

    if (name === "picture" && files.length > 0) {
      const src = URL.createObjectURL(files[0]);
      const preview = document.getElementById("profilePhoto");
      preview.src = src;
      setSrcImg(src);
    }
  };
  console.log(formValues);
  // function to handle save inputs

  const saveInput = async (e) => {
    e.preventDefault();
    // setIsSubmit(true);
    // setIsClick(true);
    setFormErrors({});
    setFormErrors(validate(formValues));

    console.log(formErrors);
    //check errors before making the axios request
    if (Object.keys(formErrors).length === 0) {
      const { name, value } = e.target;
      const { confirmpassword, ...userData } = formValues;
      setFormValues({ ...userData, [name]: value });
      // console.log({ formValues });
      // console.log({ userData });

      // setFormValues({ confirmpassword, ...formValues, [name]: value });
      try {
        const response = await axios.post(
          "http://localhost:4000/auth/register",
          formValues
        );
        console.log(response.data);

        // // // Reset the form values

        // setFormValues(initialValues);

        // Set the submission status to true
        setIsSubmit(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // console.log(userData);
  //function for validate user data
  const validate = (values) => {
    const errors = {};

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
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
  //set error start = 1
  useEffect(() => {
    setFormErrors({ start: "1" });
    // console.log({ formErrors });
    // if (Object.keys(formErrors).length === 0 && isClick) {
    //   setFormErrors({});
    // }
  }, []);

  useEffect(() => {
    if (isSubmit) {
      setFormValues(initialValues); // Reset the form values
      setIsSubmit(false); // Reset the submission status
    }
  }, [isSubmit, initialValues]);

  return (
    <Layout>
      <section className="fullpage">
        <div className="left-form">
          <form className="form">
            <h1>Register</h1>
            <div className="wrap">
              <input
                onChange={handleChange}
                value={formValues.picture}
                name="picture"
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
              <label className="labelInput">First Name* :</label>
              <br />
              <input
                onChange={handleChange}
                name="firstName"
                value={formValues.firstName}
                type="text"
                className="input"
              />
              <span className="texterr"> {formErrors.firstName}</span>
              <br />
              <label className="labelInput">Last Name* :</label> <br />
              <input
                onChange={handleChange}
                name="lastName"
                value={formValues.lastName}
                type="text"
                className="input"
              />
              <span className="texterr"> {formErrors.lastName}</span>
              <br />
              <label className="labelInput">Date Of Birth* :</label>
              <br />
              <input
                onChange={handleChange}
                value={formValues.birthDate}
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
                value={formValues.weight}
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
                value={formValues.height}
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
                value={formValues.email}
                name="email"
                type="email"
                className="input"
              />
              <span className="texterr"> {formErrors.email}</span>
              <br />
              <label className="labelInput">Password* :</label>
              <br />
              <input
                onChange={handleChange}
                value={formValues.password}
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
              <label>Male</label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                id="2"
                value="female"
                checked={formValues.gender === "female"}
                className="selctor"
              />
              <label>Female</label>
            </div>
            <span className="texterr"> {formErrors.gender}</span>
            <br />
            <button onClick={saveInput} className="btn">
              SAVE
            </button>
          </form>
        </div>
        <div className="right">
          <img src="/mascot.png" />
        </div>
      </section>
    </Layout>
  );
}

export default FormRegister;
