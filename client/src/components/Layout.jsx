/* eslint-disable react/prop-types */
import MainNav from "./mainNav";
import "../assets/styles/layout.css"

//
const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <MainNav />
      {children}
    </div>
  );
};

export default Layout;
