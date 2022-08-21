import React from 'react';
import { getData } from '../Category_Api/Category_Api';
import NoImage from '../../media/No-image-found.jpg';
import {token} from "../storeToken.js";
require('../Product/Product.scss');
require('../ProductCatalog/ProductCatalog.css');

export default class CatProd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data1: [],
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
//    console.log("~~~");
//    console.log(response1);
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
//    console.log("~~~");
//    console.log(response1);
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

  render() {
//    console.log("**********");
//    console.log(this.state.data);
//    console.log(this.state.data1);

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
          this.state.data1.map(record1 => {
            return(
                <div className="card1" key={ record1.Id }>
                <div className="card1__body">
                    <h5 className="card1__title">{record1.Name}</h5>
                    <img src={record1.ImageURL !== 'NULL' ? record1.ImageURL : NoImage} class="card1__image"/>
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
                <input type="number" min="1" name="quantity" class="form-control w-25"/>
                </div>
                <button className="card1__btn">Add to Cart</button>
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