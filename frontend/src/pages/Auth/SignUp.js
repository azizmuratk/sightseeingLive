import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../../components/Layouts/Layout";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/signup`,
        { name, email, password, phone }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/signin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <Layout>
      <div className="sign-up">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group m-2">
            <label htmlFor="signUpName" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="form-control"
              id="signUpName"
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="signUpEmail" className="form-label">
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
            <label htmlFor="signUpPhone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="form-control"
              id="signUpPhone"
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="signUpPassword" className="form-label">
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
            Sign Up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default SignUp;
