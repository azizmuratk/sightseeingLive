import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/signin`,
        { email, password }
      );
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        console.log(res.data);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message, { duration: 5000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="sign-in">
        <h1>Sign In</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group m-2">
            <label htmlFor="signInEmail" className="form-label">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="signUpEmail"
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="signInPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-control"
              id="signUpPassword"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Sign In
          </button>
          <button type="button" onClick={()=>{navigate('/forgot-password')}} className="btn btn-link m-2">
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignIn;
