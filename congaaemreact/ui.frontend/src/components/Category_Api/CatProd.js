import React from 'react';
import { getData } from '../Category_Api/Category_Api';
import NoImage from '../../media/No-image-found.jpg';
import {token} from "../storeToken.js";
import Cookies from 'universal-cookie';
import { Modal} from "react-bootstrap";
require('../Product/Product.scss');
//import 'bootstrap/dist/css/bootstrap.min.css';
require('../ProductCatalog/ProductCatalog.css');

export default class CatProd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data1: [],
      isOpen:[],
    };

    this.getRandomUsers = this.getRandomUsers.bind(this);
  }

  async getRandomUsers(cat_id) {
    console.log(cat_id);
    const category_id = cat_id;
    // check the cat_id is undefined, if undefined means, call list product api
    if (cat_id === undefined) {
    console.log('variable is undefined');
      const res = await fetch(`https://rlp-dev.congacloud.io/api/catalog/v1/products?includes=prices`,
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
    );
    const response1 = await res.json();
    this.setState({
        data1: response1
      });
    return response1;
    }
    else{
    const res = await fetch(`https://rlp-dev.congacloud.io/api/catalog/v1/categories/${category_id}/products?includes=prices&includes=categories`,
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
    );
    const response1 = await res.json();

    this.setState({
        data1: response1
      });
    return response1;
    }
  }

  // componentDidMount it will call only once by default
  async componentDidMount() {
    let response = await getData();
    const response1 = await this.getRandomUsers();
    this.setState({
            data: response,
            data1: response1
        });
  }
   openModal = (index1) => {
      this.setState(state => {
        const isOpen = state.isOpen;
        isOpen[index1]= true
       return isOpen

      } );

  console.log(index1);
    }
    closeModal = (index1) => {

      this.setState(state => {
        const isOpen = state.isOpen;
        isOpen[index1]= false
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
  return (

  <div class="row">
    <div class="column1">
    <h2 class="category-title">Related Categories</h2>
    <ul class="list-unstyled">
      {
        this.state.data.map(record => {
        return(
          <li><a class="category-list" onClick={this.getRandomUsers.bind(this, record.Id)}>{record.Name}</a></li>
          )
          })
     }
      </ul>
    </div>

    <div class="column2">
      <div className="wrapper1">
      {
        this.state.data1.map((record1,index1) => {
          return(
              <div className="card1" key={ record1.Id }>
              <div className="card1__body"                 onClick={() => this.openModal(index1)} show={ this.state.isOpen && this.state.isOpen[index1]} onHide={()=>this.closeModal(index1)}>
                      <h5 className="card1__title" id="card1__title" >{record1.Name}</h5>
                  <img src={record1.ImageURL !== 'NULL' ? record1.ImageURL : NoImage} class="card1__image" id="card1__image" />
                  <p className="card1__description">Standard Price</p>


                  { record1.Prices && record1.Prices.map(price=> {
                      return(
                      <div className="card1__price" key={ record1.Id }>
                          ${price.ListPrice}
                      </div>
                      )
                  })}

              </div>
              <hr/>
              <div class="align-items-center d-flex justify-content-center input-group-sm ng-star-inserted">
              <label class="mr-3">Quantity</label>
              <input type="number" min="1"id="quantity"  name="quantity" placeholder="1" class="form-control w-25"/>
              </div>
              <popup>
              <div className=" button">
                              
                                   { record1.Prices && record1.Prices.map(price=> {
                                                                                      return(
                                                                                      <button className="btn btn-block btn-outline-primary btn-sm ladda-button" style={{ width: "90%" ,height:"40px",margin:"10px 0px 10px 0px",border:"1px solid"}} onClick={this.createCart.bind(this, record1.Id,record1.Name,price.ListPrice)}>Add to Cart</button>
                                                                                          )
                                                                                     })}

                               </div>
             <Modal key = {record1.Id} show={ this.state.isOpen && this.state.isOpen[index1]} onHide={()=>this.closeModal(index1)}>
               <Modal.Header closeButton>
                 <Modal.Title><div key={record1.Id}><h3>{record1.Name} </h3></div></Modal.Title>
               </Modal.Header>

               <Modal.Body><img src={record1.ImageURL} class="popup_image" /><br/>
             <p id="price"> Standard Price: {record1.Prices && record1.Prices.map((price) => {
                   return (
                     <div className="card__price" key={record1.Id}>
                       ${price.ListPrice}
                     </div>
                   );
                 })}</p></Modal.Body>
               <Modal.Footer style={{padding:"0"}}>
                                            <div className=' d-flex input-group-sm ng-star-inserted' style={{margin: " 9px 246px -71px 0px"}} >
                                            <label class="mr-3">Quantity</label>
                                            <input type="number" min="1" name="quantity" placeholder="1" class="form-control w-25"/>
                                            </div>
                                  { record1.Prices && record1.Prices.map(price=> {
                                                                            return(
                                                                             <button variant="primary" className="card__btn" style={{width: "130px"}} onClick={this.createCart.bind(this, record1.Id,record1.Name,price.ListPrice)}>Add to Cart</button>
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
    </div>

  </div>

      );
}
}