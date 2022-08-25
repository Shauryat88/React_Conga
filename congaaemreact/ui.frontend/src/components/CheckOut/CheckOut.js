import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import Checkout from "./forms/Checkout";
require('./CheckOut.css');

export const ViewCartEditConfig = {

    emptyLabel: 'CheckOut',

    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

 export default class CheckOut extends Component {

 render() {
   return (
        <div class="checkout">
          <Checkout />
        </div>
   );
 }
}

MapTo('congaaemreact/components/checkout')(CheckOut);
