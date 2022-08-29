import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import CatProd from '../Category_Api/CatProd';

export const ProductCatalogEditConfig = {

    emptyLabel: 'Product Catalog',

    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

export default class ProductCatalog extends Component {

  render() {
    return (
           <div>
           <CatProd/>
           </div>
    );
  }
}

MapTo('congaaemreact/components/productcatalog')(ProductCatalog);