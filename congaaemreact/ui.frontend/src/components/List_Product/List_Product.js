import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Modal} from "react-bootstrap";
import {token} from "../storeToken.js";
//import productsData from '../../products.json';
// include product style file
require('./List_Product.scss');

export const List_ProductEditConfig = {
    emptyLabel: 'List_Product',
    isEmpty: function(props){
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class List_Product extends Component {


 constructor() {
    super();
    this.state = {
        data: [],
          isOpen:[],
    };
}

  componentDidMount() {
        fetch(
        "https://rlp-qa.congacloud.io/api/catalog/v1/categories/ACS_Cat_Category_34/products?includes=prices&includes=categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            pricelistid: "ACS_PL_SortingCat_PL",
            OrganizationId: "a5b2b6fe-02b7-47aa-b7ec-ecb619cc2f23",
            OrganizationFriendlyId: "rlp-qa-org2",
            UserId: "89761836-4d5e-4716-a320-764fedf7c0e8"
          }
        }
        )
        .then((results) => results.json())
        .then((data) => this.setState({ data: data }))
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


render() {
    console.log(this.state.data);

     if(List_ProductEditConfig.isEmpty(this.props)) {
         return null;
     }

        return (
        <div className="wrapper">
        {
          this.state.data.map((record,index) => {
            return(
                <div className="card1" key={ record.Id }>
                <div className="card1__body">
                    <h5 className="m-0 font-weight-bold d-flex text-break ng-tns-c123-15"><b>{record.Name}</b></h5>
                    <img src={record.ImageURL} class="card1__image" />
                    <p className="text-truncate ng-tns-c123-3" style={{margin:"5px 0px -4px 15px"}}>Standard Price</p>


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
                <input type="number" min="1" name="quantity" value="1" class="form-control w-25"/>
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
                                                <button className="btn btn-block btn-outline-primary btn-sm ladda-button" style={{ width: "90%" ,height:"40px",margin:"10px 0px 10px 0px",border:"2px solid4"}}>
                                                  Add to Cart
                                                </button>

                                              </div>
                            <Modal key = {record.Id} show={ this.state.isOpen && this.state.isOpen[index]} onHide={()=>this.closeModal(index)}>
                              <Modal.Header closeButton>
                                <Modal.Title><div key={record.Id}><h3>{record.Name} </h3></div></Modal.Title>
                              </Modal.Header>

                              <Modal.Body><img src={record.ImageURL} class="popup_image" /><br/>

                             {record.Id}
                            <p id="price"> Standard Price: {record.Prices && record.Prices.map((price) => {
                                  return (
                                    <div className="card__price" key={record.Id}>
                                      ${price.ListPrice}
                                    </div>
                                  );
                                })}</p></Modal.Body>
                              <Modal.Footer>
                              <div className='option'  >
                              <label class="mr-3">Quantity</label>
                              <input type="number" min="1" name="quantity" value="1" class="form-control w-25"/>
                              </div>
                              <button variant="primary" className="card__btn" style={{width: "130px"}}>Add to cart </button>
                              /*  <Button variant="secondary" onClick={()=>this.closeModal(index)}>
                                 Close
                               </Button>*/
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



MapTo('congaaemreact/components/list_product')(List_Product, List_ProductEditConfig);