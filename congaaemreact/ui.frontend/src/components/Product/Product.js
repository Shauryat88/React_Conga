import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import NoImage from '../../media/No-image-found.jpg';
import {token} from "../storeToken.js";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal} from "react-bootstrap";
import {randomstring} from 'randomstring-js';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

// include product style file
require('./Product.scss');

export const ProductEditConfig = {

    emptyLabel: 'Product',

    isEmpty: function(props) {
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class Product extends Component {


 constructor() {
    super();
    this.state = {
        data: [],
         isOpen:[],
    };
}

  componentDidMount() {
    fetch(
      "https://rlp-dev.congacloud.io/api/catalog/v1/products?includes=prices",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          pricelistid: "cbc75112-60e9-47b2-a632-f70d5912b70f",
          OrganizationId: "a65544f2-b4cb-400c-a014-1fd6b04861c9",
          OrganizationFriendlyId: "rlp-dev",
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
 openModal = (index) => {
    this.setState(state => {
      const isOpen = state.isOpen;
      isOpen[index]= true
     return isOpen

    } );

console.log(index);
  }
  closeModal = (index) => {

    this.setState(state => {
      const isOpen = state.isOpen;
      isOpen[index]= false
      return isOpen

    } );
  }
  async createCart(p_id,p_name)
  {
    console.log(p_id);
    console.log(p_name);
    const cookies = new Cookies();

    // generate random string for cart name
    var randomstring = require("randomstring");
    const cart_name= 'CART'+randomstring.generate(7);

  const createcart = [
  {
  "PriceList": {
              "Id": "cbc75112-60e9-47b2-a632-f70d5912b70f",
              "Name": "Tier 1 Hardware & Software"
          },
   "name": cart_name,
   "status": "New"
   }
   ];

   // generate random string for external id
   var randomstring = require("randomstring");
   const external_id= 'Externalid'+randomstring.generate(7);
   const addcartitem = [
  {
   "PrimaryTxnLineNumber": "1",
   "ProductId": p_id,
   "LineType": "Product/Service",
   "PricingStatus": "Pending",
   "ExternalId": external_id,
   "Quantity": 1
   }
   ];

    // checking cart id is there or not
    if(cookies.get('cartId')){
    console.log('Cart is already created');
    const cartId = cookies.get('cartId');
          // Add cart items api - POST
          fetch(`https://rlp-dev.congacloud.io/api/cart/v1/carts/${cartId}/items`, {
            method: 'POST',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
             OrganizationId: "rlp-dev",
             orgname: "rlp-dev",
             UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
            },
            body: JSON.stringify(addcartitem),
            });
           toast.success(`${p_name} adding to the cart!`);
           
            //window.location.reload(false);
            	 setTimeout(function(){
             		 window.location.reload();
           		 }, 1500);
    }
    else{
    console.log("New Cart");
      //create cart api - POST
      fetch('https://rlp-dev.congacloud.io/api/Cart/v1/carts', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
         OrganizationId: "rlp-dev",
         orgname: "rlp-dev",
         UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
        },
        body: JSON.stringify(createcart),
      })
      .then((response) => response.json())
      .then((createcart) => {
        // set cart id in cookie
        const cartId = createcart[0].Id;
        cookies.set('cartId', cartId, { path: '/' });

      // Add cart items api - POST
      fetch(`https://rlp-dev.congacloud.io/api/cart/v1/carts/${cartId}/items`, {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
         OrganizationId: "rlp-dev",
         orgname: "rlp-dev",
         UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
        },
        body: JSON.stringify(addcartitem),
        });

      toast.success(`${p_name} adding to the cart!`);
     //   window.location.reload(false);
    		 setTimeout(function(){
        		 window.location.reload();
         	 }, 1500);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      }
    }


     render() {
//    console.log("Product List");
//    console.log(this.state.data);

        if(ProductEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
        <div className="wrapper">
        {
                this.state.data.map((record,index) => {
            return(
               <div className="card1" key={ record.Id }>
                <div className="card1__body" onClick={() => this.openModal(index)}
                  show={this.state.isOpen && this.state.isOpen[index]}
                  onHide={() => this.closeModal(index)}>
                    <h5 className="card1__title" id="card1__title" ><b>{record.Name}</b></h5>
                    <img src={record.ImageURL !== null ? record.ImageURL : NoImage} class="card1__image" id="card1__image" />
                    <p className="text-truncate ng-tns-c123-3" style={{margin:"5px 0px -4px 15px" ,font:"12px" }}>Standard Price</p>
                    { record.Prices && record.Prices.map(price=> {
                        return(
                        <div className="card__price" key={ record.Id }>
                            ${price.ListPrice}
                        </div>
                        )
                    })}

                </div>
                <hr/>
                <div class="align-items-center d-flex justify-content-center input-group-sm ng-star-inserted">
                   <label class="mr-3">Quantity</label>
                   <input type="number" min="1" name="quantity"  placeholder="1"  class="form-control w-25"/>
                </div>

<div className=" button">
     { record.Prices && record.Prices.map(price=> {
     return(
     <button className="btn btn-block btn-outline-primary btn-sm ladda-button" style={{ width: "90%" ,height:"40px",margin:"10px 0px 10px 0px",border:"1px solid"}} onClick={this.createCart.bind(this, record.Id,record.Name)}>Add to Cart</button>
         )
    })}
</div>

        <popup>
            <Modal key = {record.Id} show={ this.state.isOpen && this.state.isOpen[index]} onHide={()=>this.closeModal(index)}>
              <Modal.Header closeButton>
                <Modal.Title><div key={record.Id}><h3>{record.Name} </h3></div></Modal.Title>
              </Modal.Header>
              <Modal.Body><img src={record.ImageURL !== null ? record.ImageURL : NoImage} class="popup_image" /><br/>

            <p id="price"> Standard Price: {record.Prices && record.Prices.map((price) => {
                  return (
                    <div className="card__price" key={record.Id}>
                      ${price.ListPrice}
                    </div>
                  );
                })}</p></Modal.Body>
              <Modal.Footer style={{padding:"0"}}>
              <div className=' d-flex input-group-sm ng-star-inserted' style={{margin: " 9px 246px -71px 0px"}} >
              <label class="mr-3">Quantity</label>
              <input type="number" min="1" name="quantity" placeholder="1" class="form-control w-25"/>
              </div>
              { record.Prices && record.Prices.map(price=> {
                                 return(
                                  <button variant="primary" className="card__btn" style={{width: "130px"}} onClick={this.createCart.bind(this, record.Id,record.Name,price.ListPrice)}>Add to Cart</button>
                                   )
                                 })}
              </Modal.Footer>
            </Modal>
        </popup>
                </div>
            )
        })
        }
        <ToastContainer />
        </div>
        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);