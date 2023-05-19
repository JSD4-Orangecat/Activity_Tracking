import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {

    const navigate = useNavigate();
    const [getActivity, setActivity] = useState([]);

    // Function to fetch activity data from the server
    const fetchActivity = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:4000/activities");
            const { data } = response.data;
            // Update the state variable with fetched activity data
            setActivity(data);
        } catch (err) {
            console.error(err);
        }
    };

    // Function to handle click on an activity
    const handleActivityClick = (ele) => {
        if (Object.keys(ele).length === 0) {
            navigate("/createcard");
        } else {
            navigate("/readcard");
        }
    };

    // Fetch activity data when the component mounts
    useEffect(() => {
        fetchActivity();
    }, []);

    // Ensure exactly three activities are rendered
    const renderActivity = getActivity.slice(0, 3).concat(Array(3 - getActivity.length).fill({}));

    return (
        <div>
            <div className="cards-container">
                {renderActivity.map((ele) => (
                    <div key={ele._id} onClick={() => handleActivityClick(ele)}>
                        <Card data={ele} fetchActivity={fetchActivity} />
                    </div>
                ))}
            </div>
        </div>
    );
}