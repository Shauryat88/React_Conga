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
    const token ="eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA3MTIxNjksImV4cCI6MTY2MDcxNTc2OSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiI4Q0VENEY5RTQwNDNCNUU2NTU0MTY1MzI1MkNGRkYwQSIsImlhdCI6MTY2MDcxMjE2OSwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.hjz5Qt9i9cuUYDUa3lmpbDEGyTU29av144-JRAdus_-vo8qVm0a6vTS38EwCChdfJr6hTyEHZMkvgbsmFcSsabvsdM3ZiXiAy8M9aBC8dqCxdpgPeXJmePpGdsE0IAp2J_AjPe5z0rn1i9YLSliwTaDf2EqTlPrR3O9VLMw3BQPG8_UJ8B8b3gdmPKuhTDoe4qKT1v5njTflj27ru0L9KF9efkjR48XkRPLbLyHCBKVSQIrZEpmJoaSZnDOZeVHqOMuM8c1uv9GL45SiaEhDzwSBKxN867VsYdpW3XiQm985VVpi1COKuJPjDXUjWkDfJ5vd0la3zFhmHRQKvYVqcw";
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
 console.log(this.state.data);

        if(ProductEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (
        <div className="wrapper">
        {
          this.state.data.map(record => {
            return(
                <div className="card" key={ record.Id }>
                <div className="card__body">
                    <h5 className="card__title">{record.Name}</h5>
                    <img src={record.ImageURL !== 'NULL' ? record.ImageURL : NoImage} class="card__image"/>
                    <p className="card__description">Standard Price</p>


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
                <input type="number" min="1" name="quantity" class="form-control w-25"/>
                </div>
                <button className="card__btn">Add to Cart</button>
                </div>
            )
        })
        }
        </div>


        );
    }
}

MapTo('congaaemreact/components/product')(Product, ProductEditConfig);