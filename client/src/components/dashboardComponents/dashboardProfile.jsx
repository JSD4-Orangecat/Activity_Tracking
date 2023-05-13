import '../../assets/styles/dashboardCSS/dashboardProfile.css';

export default function DashboardProfile() {
    
    return (
        <div className="dashboard-profile">
            <div className="profile-picture">
                <img src={profileData.profilePicture} alt="Profile" />
            </div>
            <h3>{profileData.username}</h3>
        </div>
    );
}

const profileData = {
    profilePicture: '/head-logo.png',
    username: 'john_doe'
};