import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { validate } from "../components/authenticateComponents/validate";
import RegisterForm from "../components/authenticateComponents/RegisterForm";
import Layout from "../components/Layout";
import axios from "axios";
import "../assets/styles/authenticateCSS/RegisterPage.css";

function FormRegister() {
  // useStates and variables
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [srcImg, setSrcImg] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmpassword: "",
    picture: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    weight: "",
    height: "",
  });



  // Function to handle change in input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  function handleFileChange(e) {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setFormValues((prevInputs) => ({ ...prevInputs, picture: file }));
    }
  }



  // Function to handle save inputs
  const saveInput = async (e) => {
    e.preventDefault();
    const error = validate(formValues);
    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      const { confirmpassword, ...userData } = formValues;
      const formData = new FormData();

      for (const [key, value] of Object.entries(userData)) {
        formData.append(key, value);
      }

      try {
        const response = await axios.post(
          "http://localhost:4000/auth/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        setIsSubmit(true);
        navigate("/login");

      } catch (error) {
        console.log(error);
      }
    }
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <Layout>
      <section className="fullpage">
        <RegisterForm
          className="left-form"
          srcImg={srcImg}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          formValues={formValues}
          formErrors={formErrors}
          saveInput={saveInput}
        />
        <img src="/cat/mascot.png" alt="Mascot" className="right" />
      </section>
    </Layout>
  );
}

export default FormRegister;