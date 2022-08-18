import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import NoImage from '../../media/No-image-found.jpg';
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
    };
}

  componentDidMount() {
    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA3NjEyODMsImV4cCI6MTY2MDc2NDg4MywiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI1RTBERDU4NUJCNzdCNDFDMzE2RTEyMzIwNUEzQjA1QiIsImlhdCI6MTY2MDc2MTI4Mywic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.kvyNI78vDoledjJf-P9KGJSJKArGVKjLXSuWpyy03n8RxNaDqrycivjUR_SJ0FB9Fjq02is06fvbI2-c1KX4vN2Apol3DQ74raUGRy5LyQL3PBdenBowpq-3UFYpxNRhT6DArSL_HUZHZIebwzszCYiACZ_5XO9CiFRfR8H1WFYGmT8FulbXTjFA_vLjv4I0OfMXMHFokikmKFBcqGSkXkGsTASkqSBDLHQB44w6WZnvzqrm1mbDjko5Zg4kGnLw-JyR_MYY1C8Tck7sqnHzCQxiMZDY8kQJQJQ5hnj6NEW8bziV3y2UBFMHMJGdnEsSAj5eguJgM1XisBXZ8W6N2g";
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


    render() {
    console.log("Product List");
    console.log(this.state.data);

        if(ProductEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
        <div className="wrapper">
        {
          this.state.data.map(record => {
            return(
                <div className="card1" key={ record.Id }>
                <div className="card1__body">
                    <h5 className="card1__title">{record.Name}</h5>
                    <img src={record.ImageURL !== 'NULL' ? record.ImageURL : NoImage} class="card1__image"/>
                    <p className="card1__description">Standard Price</p>


                    { record.Prices && record.Prices.map(price=> {
                        return(
                        <div className="card1__price" key={ record.Id }>
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


        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);