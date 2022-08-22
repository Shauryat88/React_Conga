import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import NoImage from '../../media/No-image-found.jpg';
import {token} from "../storeToken.js";
import Cookies from 'universal-cookie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal} from "react-bootstrap";

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
  async createCart(p_id,p_name,price)
  {
//    console.log(p_id);
    console.log(p_name);
//    console.log(price);

  const createcart = [
  {
  "PriceList": {
              "Id": "cbc75112-60e9-47b2-a632-f70d5912b70f",
              "Name": "Tier 1 Hardware & Software"
          },
   "name": "Test Cart 1",
   "status": "New"
   }
   ];

  //POST request with body equal on data in JSON format
  fetch('https://rlp-dev.congacloud.io/api/Cart/v1/carts', {
    method: 'POST',
    headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
     Authorization: `Bearer ${token}`,
     pricelistid: "cbc75112-60e9-47b2-a632-f70d5912b70f",
     OrganizationId: "a65544f2-b4cb-400c-a014-1fd6b04861c9",
     OrganizationFriendlyId: "rlp-dev",
     UserId: "d717a075-9cbf-480c-b230-837e0e6dee75"
    },
    body: JSON.stringify(createcart),
  })
  .then((response) => response.json())
  .then((createcart) => {
//    console.log('Success:', createcart);
//    console.log(createcart[0].Id);
    // set cart id in cookie
    const cartId = createcart[0].Id;
    const cookies = new Cookies();
    cookies.set('cartId', cartId, { path: '/' });
//    console.log(cookies.get('cartId'));
    alert(`Item Added! ${p_name} was added to the cart.`);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
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
                <div className="card1__body">
                    <h5 className="card1__title" id="card1__title" ><b>{record.Name}</b></h5>
                    <img src={record.ImageURL} class="card1__image" id="card1__image" />
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

                 <popup>
                             <div className=" button">
                                              <button
                                                  className="btn btn-block btn-outline-primary btn-sm ladda-button"
                                                  key={record.Id}
                                                  onClick={() => this.openModal(index)}
                                                  style={{width: "90%", height: "40px",border:"2px solid"}}
                                                >
                                                  View Details
                                                </button>
                                                     { record.Prices && record.Prices.map(price=> {
                                                     return(
                                                     <button className="btn btn-block btn-outline-primary btn-sm ladda-button" style={{ width: "90%" ,height:"40px",margin:"10px 0px 10px 0px",border:"2px solid"}} onClick={this.createCart.bind(this, record.Id,record.Name,price.ListPrice)}>Add to Cart</button>
                                                         )
                                                    })}
                                              </div>
                            <Modal key = {record.Id} show={ this.state.isOpen && this.state.isOpen[index]} onHide={()=>this.closeModal(index)}>
                              <Modal.Header closeButton>
                                <Modal.Title><div key={record.Id}><h3>{record.Name} </h3></div></Modal.Title>
                              </Modal.Header>
                              <Modal.Body><img src={record.ImageURL} class="popup_image" /><br/>

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
        </div>
        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);