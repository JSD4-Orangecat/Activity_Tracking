import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import swal from "sweetalert";
import "../assets/styles/Profilpage.css";
import { useNavigate } from "react-router";
import BarLoader from "react-spinners/BarLoader";

function Profile() {
  const [userData, setUserData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();
  const [srcImg, setSrcImg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  //function fetch data

  const fetchData = async () => {
    const backend = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backend}/profile`);
      setUserData(response.data.data);
      setSrcImg(response.data.data.picture);
    } catch (err) {
      console.log(err);
    }
  };
  // fetchData();
  useEffect(() => {
    fetchData();
  }, []);

  //function to handle picture change
  const handleChangePic = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setUserData({ ...userData, picture: file });
    }
  };

  //function to handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //function save update of profile

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    setIsSubmit(true);
    //validate data

    const error = validate(userData);
    setFormErrors(error);

    //check errors before making the axios request
    if (Object.keys(error).length === 0) {
      setIsProcessing(true);
      const { ...allData } = userData;

      //convert to form data
      const formData = new FormData();
      for (const [key, value] of Object.entries(allData)) {
        formData.append(key, value);
      }
      try {
        const response = await axios.put(
          `${backend}/profile/update`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        // update data to local storage
        const updateData = response.data.data;
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        currentUser.firstName = updateData.firstName;
        currentUser.lastName = updateData.lastName;
        currentUser.email = updateData.email;
        currentUser.height = updateData.height;
        currentUser.weight = updateData.weight;
        currentUser.picture = updateData.picture;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        swal("Updated!", "Your profile has been updated!", "success");
        navigate("/dashboard"); // navigate to the dashboard
      } catch (err) {
        console.log(err);
        setIsProcessing(false);
        swal("Oops", "Something went wrong!", "error");
      }
    }
  };
  //function delete profile
  const handleDeleteProfile = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await axios.delete(`${backend}/profile/delete`);
          swal("Your account has been deleted!", {
            icon: "success",
          });
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          navigate("/"); // navigate to home
        } catch (error) {
          console.log(error);
        }
      } else {
        swal("Your account is safe!");
      }
    });
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

  return (
    <Layout>
      <div>
        <form className="editform">
          <div className="TitleAndExit">
            <div className="headerProfile">
              <div className="addjustHeader">
                <h1>Profile</h1>
              </div>
            </div>
            <div className="exitEditProfile">
              <a href="/dashboard" className="cross">
                <img src="/generic/cross.jpg" className="crossPic" />
              </a>
            </div>
          </div>
          <div className="boxforflex">
            <div className="setprofile">
              <div className="wrapImgProfile">
                <label className="btnforinputphoto">
                  <input
                    onChange={handleChangePic}
                    // value={userData.picture}
                    name="picture"
                    id="inputPhotoProfile"
                    className="photos"
                    type="file"
                    accept="image/*"
                  />
                </label>
                <img
                  id="profileImg"
                  src={srcImg}
                  style={{ display: "inline" }}
                />
                <br />
              </div>
              <div className="allBtnProfile">
                <button
                  onClick={handleUpdateProfile}
                  className="btnProfile"
                  disabled={isProcessing}
                >
                  <span>{isProcessing ? "Updating ... " : "Update"}</span>
                  {isProcessing ? (
                    <div className="loading-icon-edit">
                      <BarLoader
                        color="#808080"
                        size={200}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : null}
                </button>
                <button
                  onClick={handleDeleteProfile}
                  className="btnProfile-delete"
                >
                  Delete
                </button>
              </div>
            </div>

            <div className="allInformations">
              <div className="boxRightForForm">
                <label className="labelInputEdit">First Name* :</label>
                <br />
                <input
                  type="text"
                  id="firstname"
                  value={userData.firstName}
                  onChange={handleChange}
                  name="firstName"
                  className="inputProfile"
                />
                <span className="texterr"> {formErrors.firstName}</span>
                <br />
                <label className="labelInputEdit">Last Name* :</label> <br />
                <input
                  onChange={handleChange}
                  name="lastName"
                  value={userData.lastName}
                  type="text"
                  className="inputProfile"
                />
                <span className="texterr"> {formErrors.lastName}</span>
                <br />
                <label className="labelInputEdit">Date Of Birth* :</label>
                <br />
                <input
                  onChange={handleChange}
                  value={userData.birthDate}
                  name="birthDate"
                  type="date"
                  className="inputProfile"
                />
                <span className="texterr"> {formErrors.birthDate}</span>
                <br />
                <label className="labelInputEdit">Weight* :</label>
                <br />
                <input
                  onChange={handleChange}
                  value={userData.weight}
                  name="weight"
                  type="number"
                  className="inputProfile"
                  placeholder=" kg"
                />
                <span className="texterr"> {formErrors.weight}</span>
                <br />
                <label className="labelInputEdit">Height* : </label>
                <br />
                <input
                  onChange={handleChange}
                  value={userData.height}
                  name="height"
                  type="number"
                  className="inputProfile"
                  placeholder=" cm"
                />
                <span className="texterr"> {formErrors.height}</span>
                <br />
                <label className="labelInputEdit">Email* :</label>
                <br />
                <input
                  onChange={handleChange}
                  value={userData.email}
                  name="email"
                  type="email"
                  className="inputProfile"
                />
                <span className="texterr"> {formErrors.email}</span>
                <br />
                <div className="radio" id="genderForProfile">
                  <input
                    onChange={handleChange}
                    value="male"
                    name="gender"
                    id="1"
                    type="radio"
                    checked={userData.gender === "male"}
                    className="selctorGender"
                  />
                  <label>Male</label>
                  <input
                    onChange={handleChange}
                    type="radio"
                    name="gender"
                    id="2"
                    value="female"
                    checked={userData.gender === "female"}
                    className="selctorGender"
                  />
                  <label>Female</label>
                </div>
                <span className="texterr"> {formErrors.gender}</span>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
export default Profile;
