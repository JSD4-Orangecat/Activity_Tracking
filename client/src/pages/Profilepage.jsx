import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import validateProfile from "../utils/validateProfile";
import axios from "axios";
import swal from "sweetalert";
import Layout from "../components/Layout";
import BarLoader from "react-spinners/BarLoader";
import "../assets/styles/ProfilePage.css";

const Profile = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [srcImg, setSrcImg] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleChangePic = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      setSrcImg(URL.createObjectURL(file));
      setUserData((prevData) => ({ ...prevData, picture: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const backend = import.meta.env.VITE_BACKEND_URL;
    setIsSubmit(true);

    const error = validateProfile(userData);
    setFormErrors(error);

    if (Object.keys(error).length === 0) {
      setIsProcessing(true);
      const formData = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      try {
        const response = await axios.put(
          `${backend}/profile/update`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        const updateData = response.data.data;
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        Object.assign(currentUser, {
          firstName: updateData.firstName,
          lastName: updateData.lastName,
          email: updateData.email,
          height: updateData.height,
          weight: updateData.weight,
          picture: updateData.picture,
        });
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        swal("Updated!", "Your profile has been updated!", "success");
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        setIsProcessing(false);
        swal("Oops", "Something went wrong!", "error");
      }
    }
  };

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
          await axios.delete(`${backend}/profile/delete`);
          swal("Your account has been deleted!", { icon: "success" });
          localStorage.removeItem("currentUser");
          localStorage.removeItem("token");
          navigate("/");
        } catch (error) {
          console.log(error);
        }
      } else {
        swal("Your account is safe!");
      }
    });
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