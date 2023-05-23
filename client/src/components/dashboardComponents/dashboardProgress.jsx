import '../../assets/styles/dashboardCSS/dashboardProgress.css';
import { useAuth } from '../../contexts/authentication';

export default function DashboardProgress() {
    const {currentUser} = useAuth()

    return (
        <div className="progress-container">
            <h2 className="progress-text" id="progress-text-title">Silver</h2>
            <div className="progress-content">
                <div className="progress-medal">
                    <img className="progress-img" id="top-medal" src="/medals/Cardio/medalCardioSilver.png" alt="Silver Medal" />
                </div>
                <div className="progress-next">
                    <p className="progress-text" id="progress-text-next">Next to GOLD!</p>
                    <div id="progress-next-container">
                        <div id="progress-next-left">
                            <div id="progress-bar-text">{currentUser.rank % 100}%</div>
                            <progress id="progress-bar" value={currentUser.rank % 100} max="100" />
                        </div>
                        <img className="progress-img" id="bottom-medal" src="/medals/Cardio/medalCardioGold.png" alt="Gold Medal Placeholder" />
                    </div>
                </div>
            </div>
        </div>
    );
}

const progress = 70;
