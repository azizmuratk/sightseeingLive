import React from "react";
import Layout from "../components/Layouts/Layout";
import { BiMailSend, BiPhoneCall } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout>
      <div className="row contact-us">
        <div className="col-md-6">
          <img
            className="rounded"
            src="/images/contact-us.jpg"
            alt="contact-us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center rounded">
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            Please contact us if you have any questions.
          </p>
          <p className="mt-3">
            <BiMailSend /> :{" "}
            <a
              href="mailto:info@sightseeinglive.com?subject=Contact%20Us"
              target="_top"
            >
              info@sightseeinglive.com
            </a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : +49 1523 4136065
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
