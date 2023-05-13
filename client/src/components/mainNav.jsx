import navLogoImage from "/navbar-logo.png"
import "../assets/styles/mainNav.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function MainNav() {
    //if dropdown === true, dropdown-menu will appear
    const [isDropdown, setIsDropdown] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    
    const loginContainer = (
    <div className="nav-login-container">
        <a onClick={() => setIsLogin(true)} href="#">Login</a>
        <a href="#">Sign-up</a>
    </div>
    )

    const profile = (
        <div className="profile-container">
            <div className="profile-image">
                <img src={navLogoImage} alt="Orange-cat's logo" />
            </div>
            <span onClick={() => setIsDropdown(!isDropdown)} className="profile-username"><a>USERNAME01</a></span>
        </div>
    )

    let dropdown
    if (isLogin) {
        dropdown = (
            <ul className="dropdown-menu">
                <li><div className="arrow-up"></div></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">BMI</a></li>
                <li><a href="#">How it Work</a></li>
                <li><a onClick={() => {
                    setIsLogin(false)
                    setIsDropdown(false)
                    }} href="#">Logout</a></li>
            </ul>
        )
    } else {
        dropdown = (
            <ul className="dropdown-menu">
                <li><div className="arrow-up"></div></li>
                <li><a href="#">Features</a></li>
                <li><a href="#">BMI</a></li>
                <li><a href="#">How it Work</a></li>
                <li><a onClick={() => setIsLogin(true)} href="#">Login</a></li>
                <li><a href="#">Sign-up</a></li>
            </ul>
        )
    }

    return (
        <nav className="homeNav">
            <div className="logo-container">
                <img src={navLogoImage} alt="Orange-cat's logo" />
                <span><a href="#">Orange Cat</a></span>
            </div>

            <ul className="nav">
                <li><a href="#features">Features</a></li>
                <li><a href="#bmi">BMI</a></li>
                <li><a href="#how">How it Work</a></li>
            </ul>

            {/* <div className="login-container">
                <a href="#">Login</a>
                <a href="#">Sign-up</a>
            </div> */}
            {isLogin ? profile : loginContainer}

            <span className="dropdown-btn">
                {/* toggle dropdown-menu */}
                {/* <FontAwesomeIcon onClick={() => setIsDropdown(!isDropdown)} icon={faBars} size="xl"/> */}
            </span>

            {isDropdown && dropdown}
        </nav>
    )
}