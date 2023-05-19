import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(3);
    const [getActivity, setGetActivity] = useState([]);

    const fetchActivity = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:4000/activities", {
                params: { page, limit },
            });
            const { data, totalDocs } = response.data;
            setGetActivity(data);
            setTotalPages(Math.ceil(totalDocs / limit));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchActivity();
    }, [page, limit]);

    return (
        <div className="cards-container">
            {getActivity.map((ele) => (
                <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
            ))}
        </div>
    );
}