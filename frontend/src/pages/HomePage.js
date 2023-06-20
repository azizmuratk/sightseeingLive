import React from "react";
import Layout from "../components/Layouts/Layout.js";
import { useAuth } from "../context/auth.js";

const HomePage = () => {
  const [auth, setAuth] = useAuth();

  return (
    <Layout>
      <h1>Homepage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;
