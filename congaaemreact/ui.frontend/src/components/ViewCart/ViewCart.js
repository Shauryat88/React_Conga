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
           LineItems: []
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
   return (

     <div class="container-fluid py-4 ng-star-inserted">
       <div class="px-4">
         <div class="row">
           <div class="col-12 col-md-8 mb-4">
             <div class="d-block cards">
               <div class="card-header d-flex justify-content-between align-items-center">
                 <h4 class="mb-0">
                  <span class="ng-star-inserted">Items in your cart</span>
                 </h4>
               </div>
               <table class="table ng-star-inserted">
                 <tbody>
             {cart.LineItems.map(obj=>{
              return (
                   <tr class="ng-star-inserted">
                     <td class="pt-4 pr-0 pl-3 ng-star-inserted inserted1"></td>
                     <td class="pt-4 pt-41">
                      <img class="w-100" src="https://eng-ecom.apttuscloud.io/ui/ecom/qa/assets/images/default.png?random=45"/>
                     </td>
                     <td class="w-50 pt-4">
                       <div class="h-100 d-flex flex-column border-right pr-3">
                         <div class="d-flex align-items-center mb-2"><h5 class="mr-2 mb-0 mb">{obj.Name}</h5></div>
                       </div>
                     </td>
                     <td class="pt-4 w-25">
                       <div class="d-flex justify-content-between align-items-center text-muted mt-1">
                          <span class="sp">Quantity</span><span class="sp">{obj.Quantity}</span>
                       </div>
                        <div class="d-flex justify-content-between align-items-center text-muted mt-1">
                           <span class="sp">Standard Price</span><span class="sp">${obj.ListPrice}</span>
                        </div>
                     </td>
                   </tr>
               );
             })}
                 </tbody>
               </table>
             </div>
             <a href="/content/congaaemreact/us/en/checkout.html"><button class="btn btn-primary" type="button">Place Order</button></a>
           </div>
         </div>
        </div>
     </div>

   );
 }
}

MapTo('congaaemreact/components/viewcart')(ViewCart);
