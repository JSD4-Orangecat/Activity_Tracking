import '../../assets/styles/dashboardCSS/dashboardProfile.css';

export default function DashboardProfile() {

    return (
        <div className="dashboard-profile">
            <img src={profileData.profilePicture} alt="Profile" />
            <h3>{profileData.username}</h3>
        </div>
    );
}

const profileData = {
    profilePicture: '/mockProfiles/mockProfile1.jpg',
    username: 'john_doe'
};