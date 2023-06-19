import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from 'react-hot-toast';

const Layout = (props) => {
  return (
    <React.Fragment>
      <Header />
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {props.children}
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default Layout;
