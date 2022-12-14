import React from 'react';
import { getData } from '../Category_Api/Category_Api';
import NoImage from '../../media/No-image-found.jpg';

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
    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA5MTYwMzEsImV4cCI6MTY2MDkxOTYzMSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI1QkJGNTc3RTFGRkVDRDhBMEFGRkRGQjhCQUY5Mjk2QSIsImlhdCI6MTY2MDkxNjAzMSwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.R4-i2MmY1dU5bKTK4edKXP2Ompa_84P4LjBGpCvBQHTgLQ67Gn_Ya7y_VvhPARbjLd6cZIzt3P0k7UgMM8cA7_Ta1Qscsuhib91ANxRkJipcZfiC_R_yVlqZ9Bh-3lmc6hL0q4UqmKxVnvUnqBH4AdL2035kzqdaubjf-6Nat_eDrwIpjpfscpvK-OOIxIF5vHVlDGt7Xjfk1Nan4mIvwmdraqE3x4F14COsF1LcYEvvFuf0ZOk8eKKUxwUNzVP8IvVAW5NKyhtGLMlj6TAhwsDBb3icOZRplIuva5zHTsky1N95K1sz16f-AP1JiWCNbj6-F-8eFIlgzwW_NR7RaA";
    // check the cat_id is undefined, if undefined means, call list product api
    if (cat_id === undefined) {
    console.log('variable is undefined');
    const res = await fetch(`https://rlp-qa.congacloud.io/api/catalog/v1/products?includes=prices`,
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
    const res = await fetch(`https://rlp-qa.congacloud.io/api/catalog/v1/categories/${category_id}/products?includes=prices&includes=categories`,
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