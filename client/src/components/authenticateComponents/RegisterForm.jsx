import React from "react";
import "../../assets/styles/authenticateCSS/RegisterForm.css";

const RegisterForm = ({ srcImg, handleChange, handleFileChange, formValues, formErrors, saveInput }) => {
    return (
        <form onSubmit={saveInput} className="form">
            <h1>Register</h1>

            {/* Profile Picture */}
            <div className="wrap">
                <input
                    onChange={handleFileChange}
                    name="picture"
                    className="photo"
                    type="file"
                    accept="image/*"
                />
                <img id="profilePhoto" src={srcImg} style={{ display: "inline" }} />
                <br />
            </div>

            <div className="allInform">

                {/* First Name */}
                <label className="labelInput">Name* :</label>
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

                {/* Last Name */}
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

                {/* Date of Birth */}
                <label className="labelInput">Date Of Birth* :</label>
                <br />
                <input
                    onChange={handleChange}
                    value={formValues.birthDate}
                    name="birthDate"
                    type="date"
                    className="input"
                    max={new Date(
                        new Date().getFullYear() - 7,
                        new Date().getMonth(),
                        new Date().getDate()
                    )
                        .toISOString()
                        .slice(0, 10)}
                />
                <span className="texterr"> {formErrors.birthDate}</span>
                <br />

                {/* Weight */}
                <label className="labelInput">Weight* :</label>
                <br />
                <input
                    onChange={handleChange}
                    value={formValues.weight}
                    name="weight"
                    type="text"
                    className="input"
                    placeholder=" kg"
                />
                <span className="texterr"> {formErrors.weight}</span>
                <br />

                {/* Height */}
                <label className="labelInput">Height* : </label>
                <br />
                <input
                    onChange={handleChange}
                    value={formValues.height}
                    name="height"
                    type="text"
                    className="input"
                    placeholder=" cm"
                />
                <span className="texterr"> {formErrors.height}</span>
                <br />

                {/* Email */}
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

                {/* Password */}
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

                {/* Confirm Password */}
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

            {/* Gender */}
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

            {/* Submit Button */}
            <button type="submit" className="btn">
                SAVE
            </button>
        </form>
    );
}

export default RegisterForm;