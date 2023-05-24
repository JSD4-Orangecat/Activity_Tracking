// ProfileForm.jsx
import React from "react";
import BarLoader from "react-spinners/BarLoader";

const ProfileForm = ({
    userData,
    srcImg,
    formErrors,
    isProcessing,
    handleChangePic,
    handleChange,
    handleUpdateProfile,
    handleDeleteProfile,
}) => {
    return (
        <form className="editform">

            <a href="/dashboard" className="cross">
                <img src="/generic/cross.jpg" className="crossPic" />
            </a>

            <h1 className="profileNameHeader">Profile</h1>

            <div className="boxforflex">

                <div className="setprofile">
                    <div className="wrap" id="profile-photo-setting">
                        <input
                            onChange={handleChangePic}
                            name="picture"
                            id="uploadInput"
                            type="file"
                            accept="image/*"
                        />
                        <label htmlFor="uploadInput">
                            <img
                                id="profilePhoto"
                                src={srcImg}
                                className={srcImg ? "uploaded-picture" : ""}
                            />
                        </label>
                        <div className="plus-symbol">+</div>
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
        </form>
    );
};

export default ProfileForm;