import { useEffect } from "react";
import LoginBox from "../components/loginBox";
import Layout from "../components/Layout";
import Cat from "/hero-img.png";
import "../assets/styles/login.css";

export default function Login() {
    useEffect(() => {
        document.body.classList.add('login-body');
        return () => {
            document.body.classList.remove('login-body');
        };
    }, []);

    return (
        <Layout>
            <div className="login-page">
                <LoginBox className="login-box" />
                <img className="login-image" src={Cat} alt="Muscular Orange Cat" />
            </div>
        </Layout>
    );
}