import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {
    // Define a state variable to store activity data
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

    // Fetch activity data when the component mounts
    useEffect(() => {
        fetchActivity();
    }, []);

    // Variable that sliced the activity data to only the first 3 items
    const renderActivity = getActivity.slice(0, 3);

    return (
        <div className="cards-container">
            {renderActivity.map((ele) => (
                <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
            ))}
        </div>
    );
}