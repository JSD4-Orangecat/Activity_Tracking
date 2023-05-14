import React, { useState, useEffect } from 'react';
import '../../assets/styles/dashboardCSS/dashboardAchievements.css';

export default function DashboardAchievements() {
    const [achievements, setAchievements] = useState([]);

    useEffect(() => {
        const updateAchievements = () => {
            const maxItems = window.innerWidth >= 768 ? 6 : 3; // Change the breakpoint as per your requirements
            setAchievements(achievementsMockData.slice(0, maxItems));
        };

        window.addEventListener('resize', updateAchievements);
        updateAchievements();

        return () => window.removeEventListener('resize', updateAchievements);
    }, []);

    return (
        <div className="achievements-container">
            <h2 className="achievements-text">Achievements</h2>
            <div className="achievements-wrapper">
                {achievements.map(({ achievementImg }, index) => (
                    <div key={index} className="achievement-image">
                        <img src={achievementImg} alt="Profile" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const achievementsMockData = [
    { achievementImg: '/head-logo.png' },
    { achievementImg: '/head-logo.png' },
    { achievementImg: '/head-logo.png' },
    { achievementImg: '/head-logo.png' },
    { achievementImg: '/head-logo.png' },
    { achievementImg: '/head-logo.png' },
];
