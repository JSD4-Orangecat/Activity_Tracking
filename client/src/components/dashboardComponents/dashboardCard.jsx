import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {
    const [getActivity, setGetActivity] = useState([]);

    const fetchActivity = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:4000/activities");
            const { data } = response.data;
            setGetActivity(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchActivity();
    }, []);

    const renderActivity = getActivity.slice(0, 3);

    return (
        <div className="cards-container">
            {renderActivity.map((ele) => (
                <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
            ))}
        </div>
    );
}