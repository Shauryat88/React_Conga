import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import {token} from "../storeToken.js";

// include product style file
require('./FetchCategory.scss');

export const FetchCategoryEditConfig = {

    emptyLabel: 'Fetch Product',

    isEmpty: function(props) {
        return !props || !props.message || props.text.trim().length < 1;
    }
};

export default class FetchCategory extends Component {


 constructor() {
    super();
    this.state = {
        data: [],
    };
}

  componentDidMount() {
    fetch(
    "https://rlp-qa.congacloud.io/api/catalog/v1/categories/ACS_Cat_Category_34",
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
        .then((resp) => resp.json())
        .then((result) => this.setState({ users: result }))
        .catch((err) => {
          console.log("error", err);
        });
    }


   render() {

      const users = this.state.users;
       console.warn(users);


         if(FetchCategoryEditConfig.isEmpty(this.props)) {
                   return null;
               }

       return (


         <div className="wrapper">

               <div key={users.Name}>{users.Name}</div>
               <div className="card" key={users.Id}>
                 <div className="card__body">
                   <h5 className="card__title">{users.Name}</h5>
                   <img src={users.ImageURL} class="card__image" />
                   <p className="card__description">Standard Price</p>

                   {users.Prices &&
                     users.Prices.map((price) => {
                       return (
                         <div className="card__price" key={users.Id}>
                           ${price.ListPrice}
                         </div>
                       );
                     })}
                 </div>
                 <hr />
                 <div className="align-items-center d-flex justify-content-center input-group-sm ng-star-inserted">
                   <label className="mr-3">Quantity</label>
                   <input
                     type="number"
                     min="1"
                     name="quantity"
                     value="1"
                     class="form-control w-25"
                   />
                 </div>
                 <button className="card__btn"></button>
               </div>

          </div>

       );
     }
   }

MapTo('congaaemreact/components/fetchCategory')(FetchCategory, FetchCategoryEditConfig);
