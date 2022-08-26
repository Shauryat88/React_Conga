import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import Cookies from 'universal-cookie';
import {token} from "../storeToken.js";
import "./ViewCart.css";

export const ViewCartEditConfig = {

    emptyLabel: 'ViewCart',

    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

export default class ViewCart extends Component {

    constructor(props) {
        super(props);
        this.state = {
          getdata: {
            CartResponse: {
              LineItems: [],
              SummaryGroups: [{}]
            }
          }
        };
    }

    componentDidMount() {
        const cookies = new Cookies();
        console.log(cookies.get('cartId'));
        const cartId = cookies.get('cartId');
        fetch(`https://rlp-dev.congacloud.io/api/cart/v1/carts/${cartId}/price`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            orgname: "rlp-dev",
            OrganizationId: "rlp-dev",
            UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
          }
        })
          .then((results) => results.json())
          .then((getdata) => this.setState({ getdata: getdata }))
          .catch((err) => {
            console.log("error", err);
          });
        }

    render() {
            const value=this.state.getdata;
            const cart=value.CartResponse;
            const total = cart.SummaryGroups[cart.SummaryGroups.length-1].NetPrice;

        return (

    <div class="container-fluid py-4">
      <div class="px-4">
        <div class="row">
          <div class="col-12 col-md-8 mb-4">
            <div class="d-block card_1">
              <div class="card-header d-flex justify-content-between align-items-center">
                <h4 class="mb-0"><span>Items in your cart</span></h4>
              </div>
                <table class="table">
                  <tbody>
                 {cart.LineItems.map(obj=>{
                    return(
                      <tr>
                        <td class="w-50 pt-4">
                           <div class="h-100 d-flex flex-column border-right pr-3">
                                 <div class="d-flex align-items-center mb-2">
                                   <h5 class="mr-2 mb-0"><a class="name" href="#">{obj.Name}</a></h5>
                                 </div>
                                 <p class="text-muted subtitle"><span>Standard Price</span></p>
                                 <p class="description"></p>
                                 <div class="row">
                                   <div class="col-md-4">
                                     <div><span>
                                     <dt class="frequency"> Pricing Frequency </dt>
                                     <dd class="m-0 py-2 position-relative py-1 frequency">
                                         <span>{obj.Frequency}</span>
                                     </dd>
                                     </span></div>
                                   </div>
                                   <div class="col-md-4">
                                     <div><span>
                                          <dt class="frequency"> Price Type </dt>
                                          <dd class="m-0 py-2 position-relative py-1 frequency">
                                              <span>{obj.PriceType}</span>
                                          </dd>
                                     </span></div>
                                   </div>
                                   <div class="col-md-4">
                                     <div><span>
                                          <dt class="frequency"> Selling term </dt>
                                          <dd class="m-0 py-2 position-relative py-1 frequency">
                                              <span>{obj.SellingTerm}</span>
                                          </dd>
                                     </span></div>
                                   </div>
                                   <div class="col-md-4"></div>
                                   <div class="col-md-4"></div>
                                   <div class="col-md-4"></div>
                                 </div>
                           </div>
                        </td>

                        <td class="pt-4 w-25">
                          <div class="d-flex flex-column h-100 justify-content-between">
                            <div>
                              <div class="d-flex justify-content-between align-items-center text-muted mt-1">
                                <span> Standard Price </span>
                                <span> ${obj.ListPrice} </span>
                              </div>

                              <div class="d-flex justify-content-between align-items-center mt-1">
                                <span class="label-only">
                                    <dt class="font-weight-normal"> Net Price </dt>
                                </span>
                                <span> ${obj.NetPrice} </span>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                   );
                     })}
                  </tbody>
                </table>
            </div>
          </div>


          <div class="col-12 col-md-4">
            <div class="card_1">
              <div class="card-header">
                <h5 class="card-title mb-0">Price Summary</h5>
              </div>
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <span> Sub Total </span><span class="font-weight-bold"> {total} </span>
                </div>
                <hr class="mt-3 mb-2"/>
                <div class="d-flex justify-content-between"><span> Total Price </span><span class="font-weight-bold"> {total} </span></div>
                <hr class="mt-2 mb-3"/>
                <div class="d-flex justify-content-end"><button class="btn btn-primary btn-raised ladda-button"><span class="ladda-label"> Place Order </span><span class="ladda-spinner"></span></button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

        );
    }

}
MapTo('congaaemreact/components/viewcart')(ViewCart);