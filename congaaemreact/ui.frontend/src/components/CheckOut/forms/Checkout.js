import React from "react";
import { Form, Field } from "react-final-form";

import Contact from "./Contact";
import ShippingAddress from "./ShippingAddress";
require('./styles.scss');

const Checkout = () => (
  <div>
    <Contact />
    <ShippingAddress />
  </div>
);

const legend = {
  fontSize: "20px",
  textAlign: "initial"
};

export default Checkout;
