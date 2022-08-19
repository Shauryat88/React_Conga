import React from 'react';
import { getData } from '../Category_Api/Category_Api';
class List_Category extends React.Component {

 constructor() {
    super();
    this.state = {
        data: [],
    };
}

async componentDidMount() {
    let response = await getData();
    this.setState({
      data: response
      })
  }

  render() {
//   console.log("Category List");
//   console.log(this.state.data);
    return (
          <div class="category_scroll">
          {
          this.state.data.map(record => {
          return(
            <div id="category_list">
                <li><a class="menu__item" href="#">{record.Name}</a></li> <br/>
            </div>
            )
            })
          }
          </div>
         );
  }
}

export default List_Category;