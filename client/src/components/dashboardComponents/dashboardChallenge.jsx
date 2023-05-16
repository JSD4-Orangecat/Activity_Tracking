import '../../assets/styles/dashboardCSS/dashboardChallenge.css';

export default function DashboardChallenge() {

    return (
        <div>
            <h2 className="progress-text" id="challenge-text-title">Challenge!</h2>
            <div className="friend-profile-container">
                {friendsMockData.map((friend, index) => (
                    <div key={index} className="friend-profile">
                        <img src={friend.profileImg} alt="Friend Profile" />
                        <h3>{friend.username}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

const friendsMockData = [
    {
        profileImg: '/mockProfiles/mockProfile2.jpg',
        username: 'ben_dover'
    },
    {
        profileImg: '/mockProfiles/mockProfile3.jpg',
        username: 'kimmy_hed'
    },
    {
        profileImg: '/mockProfiles/mockProfile4.jpg',
        username: 'dixie_normus'
    },
    {
        profileImg: '/mockProfiles/mockProfile5.jpg',
        username: 'hugh_jass'
    },
    {
        profileImg: '/mockProfiles/mockProfile6.jpg',
        username: 'jenna_tolls'
    },
    {
        profileImg: '/mockProfiles/mockProfile7.jpg',
        username: 'gabe_itch'
    },
    {
        profileImg: '/mockProfiles/mockProfile8.jpg',
        username: 'rae_piste'
    },
    {
        profileImg: '/mockProfiles/mockProfile9.jpg',
        username: 'moe_lester'
    },
];