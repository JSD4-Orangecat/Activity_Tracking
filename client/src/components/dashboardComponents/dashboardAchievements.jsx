import '../../assets/styles/dashboardCSS/dashboardAchievements.css';

export default function DashboardAchievements() {
    
    return (
        <div>
            <h2 className="achievements-text">Achievements</h2>
            <div className="achievements-container">
                {achievementsMockData.map((achievement, index) => (
                    <div key={index} className="achievement-image">
                        <img src={achievement.achievementImg} alt="Profile" />
                    </div>
                ))}
            </div>
        </div>
    );
}

const achievementsMockData = [
    {
        achievementImg: '/head-logo.png',
    },
    {
        achievementImg: '/head-logo.png',
    },
    {
        achievementImg: '/head-logo.png',
    },
    {
        achievementImg: '/head-logo.png',
    },
    {
        achievementImg: '/head-logo.png',
    },
    {
        achievementImg: '/head-logo.png',
    },
];
