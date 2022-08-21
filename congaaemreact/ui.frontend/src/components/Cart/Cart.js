import React from 'react';
import {token} from "../storeToken.js";
import Cookies from 'universal-cookie';

export default class Cart extends React.Component {

 constructor() {
    super();
    this.state = {
        data: [],
    };
}

  async getCart()
  {
    const cookies = new Cookies();
    console.log(cookies.get('cartId'));
    const cartId = cookies.get('cartId');

    fetch(
      `https://rlp-dev.congacloud.io/api/Cart/v1/carts/${cartId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          orgname: "rlp-dev",
          OrganizationId: "rlp-dev",
          UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
        }
      }
    )
    .then(results => results.json())
        .then(data => this.setState({ data: data }))
        //.then(console.log(this.state.data))
    .catch((err) => {
      console.log("error", err);
    });
  }


  render() {
    return (
            <button onClick={this.getCart.bind(this)}>View Cart</button>
        );
  }
}