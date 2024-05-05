import React from "react";

import ModalSearch from "../components/ModalSearch";
import Footer from "../components/Footer";
import Copyright from "../components/Copyright";
import Navbar from "../components/Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ModalSearch />
      {children}
      <Footer />
      <Copyright />
    </>
  );
};

export default DefaultLayout;
