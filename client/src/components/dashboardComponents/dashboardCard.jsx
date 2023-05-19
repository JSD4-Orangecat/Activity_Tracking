import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../readCardComponents/readCardCard";
import '../../assets/styles/dashboardCSS/dashboardCard.css';

export default function DashboardCards() {

    const pageLimit = 4;

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(pageLimit);
    const [getactivity, setGetActivity] = useState([]);



    const fetchActivity = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:4000/activities", {
                params: {
                    page,
                    limit,
                }
            });
            setGetActivity(response.data.data);
            //Get total of document in database and calculate total pages.
            const { totalDocs } = response.data
            const totalPages = Math.ceil(totalDocs / limit)
            setTotalPages(totalPages)

        } catch (err) {
            console.error(err);
        }
    };



    useEffect(() => {
        fetchActivity();
    }, [page, limit]);



    return (
        <div className="cards-container">
            {getactivity.map((ele) => (
                <Card key={ele._id} data={ele} fetchActivity={fetchActivity} />
            ))}
        </div>
    );
}