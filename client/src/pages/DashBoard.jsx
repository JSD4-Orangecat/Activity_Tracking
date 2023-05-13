import { useEffect } from "react";
import DashboardBox from "../components/dashboardComponents/dashboardBox";
import Layout from "../components/Layout";
// import "./dashboard.css";

export default function Dashboard() {
    useEffect(() => {
        document.body.classList.add('dashboard-body');
        return () => {
            document.body.classList.remove('dashboard-body');
        };
    }, []);

    return (
        <Layout>
            <div className="dashboard-page">
                <DashboardBox className="dashboard-box" />
            </div>
        </Layout>
    );
}