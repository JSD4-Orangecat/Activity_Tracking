import { useEffect } from 'react';
import '../../assets/styles/dashboardCSS/dashboardBox.css';

import DashboardProfile from './dashboardProfile';
import DashboardProgress from './dashboardProgress';
import DashboardChallenge from './dashboardChallenge';
import DashboardAchievements from './dashboardAchievements';
import DashboardCards from './dashboardCard';
import DashboardGoals from './dashboardGoals';

export default function DashboardBox() {
    useEffect(() => {
        document.body.classList.add('dashboard-body');
        return () => {
            document.body.classList.remove('dashboard-body');
        };
    }, []);

    return (
        <div className="dashboard-container">
            <div className="dashboard-column" id="column-1">
                <div className="dashboard-card">
                    <DashboardProfile />
                </div>
                <div className="dashboard-card">
                    <DashboardProgress />
                </div>
                <div className="dashboard-card">
                    <DashboardChallenge />
                </div>
            </div>
            <div className="dashboard-column" id="column-2">
                <div className="dashboard-card">
                    <DashboardAchievements />
                </div>
                <div className="dashboard-card">
                    <DashboardCards />
                </div>
                <div className="dashboard-card">
                    <DashboardGoals />
                </div>
            </div>
        </div>
    )
}