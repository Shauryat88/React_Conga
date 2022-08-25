import React from 'react';
import {token} from "../storeToken.js";
import Cookies from 'universal-cookie';
import {Container , Dropdown} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
require('./Cart.css');

export default class Cart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      getdata: {
        CartResponse: {
          LineItems: []
        }
      }
    };
  }

  componentDidMount()
  {
    const cookies = new Cookies();
    console.log(cookies.get('cartId'));
    const cartId = cookies.get('cartId');

    fetch(
      `https://rlp-dev.congacloud.io/api/cart/v1/carts/${cartId}/price`,
      {
        method: "POST",
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
        .then(getdata => this.setState({ getdata: getdata }))
    .catch((err) => {
      console.log("error", err);
    });
  }

  render() {
    console.log('Get Cart Items');
    const Records=this.state.getdata;
    const cart=Records.CartResponse;
    return (
    <div class="main">
        <div className="App">
            <Container className='p-4'>
              <Dropdown>
                  <Dropdown.Toggle variant=" primary" id="dropdown-basic">
                     <FontAwesomeIcon icon={faShoppingCart} />
                  </Dropdown.Toggle>

                <Dropdown.Menu>
                  {cart.LineItems.map(obj=>{
                   return (
                   <div>
                     <ul class="list-group">
                      <li class="d-flex2 d-flex1">
                        <img class="align-self-center1" src="https://eng-ecom.apttuscloud.io/ui/ecom/qa/assets/images/default.png?random=45"/>
                            <div class="ml-3">
                                <Dropdown.Item href="#">{obj.Name}</Dropdown.Item>
                                <div class="align-self-center1 d-flex2">
                                  <label class="m-0 mr-2 font-weight-bold">Quantity</label>&nbsp;&nbsp;&nbsp;&nbsp;{obj.Quantity}
                                  <strong class="ml-auto"><pre>${obj.ListPrice}</pre></strong>
                                </div>
                            </div>
                      </li>
                     </ul>
                   </div>
                    );
                  })}
                  <a class="viewcart" href="/content/congaaemreact/us/en/view_cart.html"><button class="btn btn-primary btn-raised btn-block"> View Cart </button></a>
                </Dropdown.Menu>
               <span class="badge badge-primary p-1 ng-star-inserted">{Records.TotalLines}</span>
             </Dropdown>
            </Container>
        </div>
    </div>
           );
  }
}