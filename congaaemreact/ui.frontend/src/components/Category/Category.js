import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';

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
   const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyRDhBQzE4QTIzNEI4QUEwRDM2NzVEOEUxNTEzMjY5NThCMEU3OThSUzI1NiIsInR5cCI6ImF0K2p3dCIsIng1dCI6IkF0aXNHS0kwdUtvTk5uWFk0VkV5YVZpdzU1ZyJ9.eyJuYmYiOjE2NjA2NjY1MDEsImV4cCI6MTY2MDY3MDEwMSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5jb25nYWNsb3VkLmlvL2ludC9hcGkvdjEvYXV0aCIsImNsaWVudF9pZCI6ImNvbmdhLWFlbS1wb2MiLCJqdGkiOiJFM0FCNjM4QkM1QUI5M0RGN0RBMDQ2MDdGMERBMTZEQiIsImlhdCI6MTY2MDY2NjUwMSwic2NvcGUiOlsiQXV0aC5BcGkuUmVhZCJdfQ.yZqLmwKpRwagXwT65fRY3WHMApsR5ATSkv-EDEJXfdwmXOCfcPaHgvtYpyM8LtFt1ua6YY7F27rSI1fBauyHZEM2_nu6dGbGHADcPvoNHGiSyUdA2p1PehgBrsMHAjkX3cE3luaQj2yrdm0uYQQ1FYhrB0f-1eB35CBreUWt5DODl3lmSsksymcITMNSgIpD9E1dpTjAoMvz5pcFB6guRNVmZqDq_DkSwTx5VWZ7yynaeCKhiUewIkieygH4EJh07V8evetWAy33nQLXhBtmufOOOQiOQpGo-k5Zfp7nbXh3rMcAVQ8z2CMrTKjmi5xe99saYzurxZJ9a1bzORTdYg";
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