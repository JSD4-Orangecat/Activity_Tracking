import '../../assets/styles/dashboardCSS/dashboardChallenge.css';

export default function DashboardChallenge() {

    return (
        <div>
            <h2 className="progress-text" id="challenge-text-title">Challenge!</h2>
            <div className="friend-profile-container">
                {friendsMockData.map((friend, index) => (
                    <div key={index} className="friend-profile">
                        <div className="friend-image">
                            <img src={friend.profileImg} alt="Friend Profile" />
                        </div>
                        <h3>{friend.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

const friendsMockData = [
    {
        profileImg: '/head-logo.png',
        username: 'jane_smith'
    },
    {
        profileImg: '/head-logo.png',
        username: 'alex_jones'
    },
    {
        profileImg: '/head-logo.png',
        username: 'sarah_taylor'
    },
    {
        profileImg: '/head-logo.png',
        username: 'david_brown'
    },
    {
        profileImg: '/head-logo.png',
        username: 'emily_clark'
    },
    {
        profileImg: '/head-logo.png',
        username: 'mike_wright'
    },
];