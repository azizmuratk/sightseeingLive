import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import Layout from "../../components/Layouts/Layout";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        { email, newPassword }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        navigate("/signin");
      } else {
        toast.error(res.data && res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout>
      <div className="forgot-password">
        <h1>Reset Password</h1>
        <form onSubmit={submitHandler}>
          <div className="form-group m-2">
            <label htmlFor="forgotEmail" className="form-label">
              E-Mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-control"
              id="forgotEmail"
              required
            />
          </div>
          <div className="form-group m-2">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="form-control"
              id="newPassword"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary m-2">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
