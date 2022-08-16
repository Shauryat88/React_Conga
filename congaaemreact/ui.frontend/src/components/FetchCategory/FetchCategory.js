import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';


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
  const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA2NjI3NzEsImV4cCI6MTY2MDY2NjM3MSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiIwNURDMTRFMkY2QTI0RDlBQzBFRjNEMzNFQUU5OTMxQyIsImlhdCI6MTY2MDY2Mjc3MSwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.TV3Z8r379pQaL4gSO6UoYC0jm2Eum8yZGvMhnVBIboKo2kSziaxE5zWGS4aXD2-eZBO0ImbQWIk1n8ezLa3F5s10Xja1EbI4SpUDRtH8CcUMblYEstvE-fFvXZI7ayCpslY2NosXD1GJDS1tPrNHfNbSYvwdxkJyk0d3re5p5uS53dNkkm-TydqukOrPQbii8YxhjTlWxtIOBwXcvGv6OFezw45ZvnMpr9WJ1zurQL6t82QoaVjHY-KDz_NhGH2-ywZu4OHKCAhvQWtJdpPH2sqMHkPXXtnJIsr-m8j9jtkCrDL_jlLUvS2nENj4bRy-Jf_mYfUx1HH6oYbktXLK1Q";
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
