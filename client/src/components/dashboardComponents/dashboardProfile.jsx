import "../../assets/styles/dashboardCSS/dashboardProfile.css";
import defaultImage from '/home/home-ceo.jpg'
import { useAuth } from "../../contexts/authentication";

export default function DashboardProfile() {
  const { currentUser } = useAuth();

  return (
    <div className="dashboard-profile">
      <img src={currentUser.picture ? currentUser.picture : defaultImage} alt="Profile" />
      <h3>{currentUser.firstName}</h3>
    </div>
  );
}

const profileData = {
  profilePicture: "/mockProfiles/mockProfile1.jpg",
  username: "Chris_Cross",
};
