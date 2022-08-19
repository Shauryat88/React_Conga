import React, {Component} from 'react';
import congaLogo from '../../media/conga-logo.png';
import {MapTo} from '@adobe/aem-react-editable-components';
import { withRouter } from "react-router";
import {Link} from "react-router-dom";

// implement font-icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import * as FaIcons from 'react-icons/fa';
import * as BiIcons from "react-icons/bi";
import * as FiIcons from "react-icons/fi";

// fetch category listing from api
import List_Category from '../List_Category/List_Category';

// include header style file
require('./Header.scss');

export const HeaderEditConfig = {

    emptyLabel: 'Header',

    isEmpty: function(props) {
        return !props || !props.items || props.items.length < 1;
    }
};

export default class Header extends Component {

    get searchButton() {
    return(<div className="Search">
           | <FontAwesomeIcon icon={faSearch} />
         </div>)
    }

    get cartButton() {
    return(<div className="Cart">
           | <FontAwesomeIcon icon={faShoppingCart} />
         </div>)
    }

    get logo() {
        let logo = <img className="Logo-img" src={congaLogo} alt="Conga" />;
        return (
            <div className="Logo">
                {logo}
            </div>
        );
    }

    get sidebarmenu(){
        return(
            <div class="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label class="menu__btn" for="menu__toggle">
                  <span></span>
                </label>

                <ul class="menu__box">
                  <li><a class="menu__item" href="/content/congaaemreact/us/en/home.html"><FaIcons.FaHome/> Home</a></li>
                  <li><a class="menu__item" href="/content/congaaemreact/us/en/catalog.html"><BiIcons.BiCategory/> Product Catalog</a></li>
                  <li><a class="menu__item" href="#"><FiIcons.FiLogIn/> Log In</a></li>
                  <hr/>
                  <List_Category />
                </ul>
            </div>
        )
    }

    render() {
        if(HeaderEditConfig.isEmpty(this.props)) {
            return null;
        }

         return (
            <header className="Header">
                <div className="Header-container">
                    {this.sidebarmenu}
                    {this.logo}
                    {this.searchButton}
                    {this.cartButton}
                </div>
            </header>
        );
    }
}

MapTo('congaaemreact/components/header')(withRouter(Header), HeaderEditConfig);