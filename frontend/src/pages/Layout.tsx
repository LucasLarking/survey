import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import OptionProvider from "../option/OptionProvider";

const Layout = () => {

  return (
    <>
    
        <OptionProvider>

          <Navbar />
          <Outlet />
        </OptionProvider>
      

    </>
  );
};

export default Layout;