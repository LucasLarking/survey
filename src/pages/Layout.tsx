import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import OptionProvider from "../option/OptionProvider";
import { TakeoptionProvider } from "../TakeSurvey/option";

const Layout = () => {

  return (
    <>
      <TakeoptionProvider>
        <OptionProvider>

          <Navbar />
          <Outlet />
        </OptionProvider>
      </TakeoptionProvider>

    </>
  );
};

export default Layout;