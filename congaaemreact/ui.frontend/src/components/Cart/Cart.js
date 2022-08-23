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
      `https://rlp-dev.congacloud.io/api/cart/v1/carts/${cartId}/items`,
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
    console.log('Get Cart Items');
//    console.log(this.state.data);
    const Records = this.state.data;
    console.log(Records);
    return (
         <div class="main">
            <button onClick={this.getCart.bind(this)}>View Cart</button>

            <div>
                {Records && Records.map(record => {
                return(
                <div>
                  {record.LineItems && record.LineItems.map((obj, i) => {
                    return (
                      <div key={i}>
                        <h2>Name: {obj.Name}</h2>
                        <h2>Quantity: {obj.Quantity}</h2>
                      </div>
                    );
                  })}
                </div>
                );
                })}
            </div>
         </div>
           );
  }
}