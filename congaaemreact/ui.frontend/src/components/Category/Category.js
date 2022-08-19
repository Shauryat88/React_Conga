import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import {token} from "../storeToken.js";
export const CategoryEditConfig = {

    emptyLabel: 'Category',

    isEmpty: function(props) {
        return !props || !props.message || props.message.trim().length < 1;
    }
};

export default class Category extends Component {

constructor() {
    super();
    this.state = {
        data: [],
    };
}

  componentDidMount() {
    fetch(
      "https://rlp-qa.congacloud.io/api/catalog/v1/categories",
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

    .then(results => results.json())
        .then(data => this.setState({ data: data }))
    .catch((err) => {
      console.log("error", err);
    });
  }


    render() {
 console.log(this.state.data);


        if(CategoryEditConfig.isEmpty(this.props)) {
            return null;
        }

        return (

        <div className="wrapper">
        {
          this.state.data.map(record => {
            return(
                <div className="card" key={ record.Id }>
                <div className="card__body">
                    <h9 className="card__title">{record.Name}</h9>
                </div>
                </div>
            )
        })
        }
        </div>


        );
    }
}

MapTo('congaaemreact/components/category')(Category, CategoryEditConfig);