import '../../assets/styles/dashboardCSS/dashboardProgress.css';

export default function DashboardProgress() {

    return (
        <div className="progress-container">
            <h2 className="progress-text" id="progress-text-title">Silver</h2>
            <img className="progress-img" id="top-medal" src="https://via.placeholder.com/150x150.png?text=Silver+Medal" alt="Silver Medal" />
            <p className="progress-text" id="progress-text-next">Next to GOLD!</p>
            <div id="progress-next-container">
                <div id="progress-next-left">
                    <div id="progress-bar-text">{progress}%</div>
                    <progress id="progress-bar" value={progress} max="100" />
                </div>
                <img className="progress-img" id="bottom-medal" src="https://via.placeholder.com/150x150.png?text=Gold+Medal" alt="Gold Medal Placeholder" />
            </div>
        </div>
    );
}

const progress = 70;
