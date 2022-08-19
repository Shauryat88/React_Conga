import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
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
  
    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA4ODcwMzQsImV4cCI6MTY2MDg5MDYzNCwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI2OEIwMTk5OTJDMDE0OUQ2MDIwREY5Q0M0OTAwODY2MCIsImlhdCI6MTY2MDg4NzAzNCwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.BjNw1sZgQ-Qs2o9Huh8DFAbdEj3bnDaQN6Zda-qH-J_DX1F414NZ38slzQ11O2ouv3kMED8gd86LO8oanNV8Z-2KT0_JAdrIdUjsRO_zxWtguDgcbWH6sDLDxugDzHwq-qwdEheQbxBPERscVkjH6eCITUtF0FlcGF9Ldi47m8ovOT7sYFoTnknojYKM0G_NYHr1rqaeZYCPOHc2oYvamEG8i0YriIAd00yuBG0XFUe3_nTExIbSalz3M-YxkIXFyzQqBnGbsjYd85zxugUNL_x2aov89ICuMFB0-g_80h42Z-e-h8DwLOJI_CGu0tZ37bxiH4smGumtzcw_Iyt0cQ";
        fetch(
      "https://rlp-qa.congacloud.io/api/catalog/v1/products?includes=prices",
      {
        method: "GET",
        headers: {
              "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          pricelistid: "62ad6108-6abc-465c-b137-3bd3327a2fe6",
          OrganizationId: "a5b2b6fe-02b7-47aa-b7ec-ecb619cc2f23",
          OrganizationFriendlyId: "rlp-qa-org2",
          UserId: "89761836-4d5e-4716-a320-764fedf7c0e8"
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


    render() {
 console.log(this.state.data);
console.log(this.state.isOpen);
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
                                                <button className="btn btn-block btn-outline-primary btn-sm ladda-button" style={{ width: "90%" ,height:"40px",margin:"10px 0px 10px 0px",border:"2px solid"}}>
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