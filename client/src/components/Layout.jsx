/* eslint-disable react/prop-types */
import MainNav from "./mainNav";

//
const Layout = ({ children }) => {
  return (
    <div>
      <MainNav />
      {children}
    </div>
  );
};

export default Layout;
