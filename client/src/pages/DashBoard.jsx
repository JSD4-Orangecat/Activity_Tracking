import { useEffect } from "react";
import DashboardBox from "../components/dashboardComponents/dashboardBox";
import Layout from "../components/Layout";
// import "./dashboard.css";

export default function Dashboard() {
  useEffect(() => {
    document.body.classList.add("dashboard-body");
    return () => {
      document.body.classList.remove("dashboard-body");
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="dashboard-page">
        <DashboardBox className="dashboard-box" />
      </div>
    </Layout>
  );
}
