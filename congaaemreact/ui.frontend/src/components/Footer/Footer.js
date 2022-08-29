import React, {Component} from 'react';
import {MapTo} from '@adobe/aem-react-editable-components';
import sanitizeHtml from 'sanitize-html';
import sanitizeWhiteList from '../sanitize-html.whitelist';
import extractModelId from '../../utils/extract-model-id';
import congaLogo from '../../media/conga-logo.png';

require('./Footer.css');

export const FooterEditConfig = {

    emptyLabel: 'Footer',

    isEmpty: function(props) {
        return !props || !props.text || props.text.trim().length < 1;
    }
};

 export default class Footer extends Component {

   get richTextContent() {
     return (
       <div
         id={extractModelId(this.props.cqPath)}
         data-rte-editelement
         dangerouslySetInnerHTML={{
           __html: sanitizeHtml(this.props.text, sanitizeWhiteList)
         }}
       />
     );
   }

    get textContent() {
        return '';
    }

    get customFooter() {
        return(
    <footer>
        <div class="content">
             <div class="left box">
               <div class="upper">
                 <img className="Logo-img" src={congaLogo} alt="Conga" />
                 <div className="footertext">
                     <div className="p_text">Goodbye complexity. Hello Conga.</div>
                     <div>Manage,transform and scale throughout the revenue lifecycle with the most complete solution available.</div>
                 </div>
               </div>
             </div>
             <div class="middle box">
               <div class="topic">Products</div>
               <div><a href="#">New Products</a></div>
               <div><a href="#">Discount Products</a></div>
               <div><a href="#">Best Sell Products</a></div>
               <div><a href="#">Popular Products</a></div>
               <div><a href="#">Manufacturers</a></div>
               <div><a href="#">Suppliers</a></div>
               <div><a href="#">Special Products</a></div>
             </div>
             <div class="right box">
               <div class="topic">Get In Touch <div className="withConga">with Conga</div></div>
               <form action="#">
                 <input type="text" placeholder="Your name here..."/>
                 <input type="text" placeholder="Your email here..."/>
                 <textarea rows="3" placeholder="Your message here..."/>
                 <input type="button" name="" value="Submit"/>
               </form>
             </div>
           </div>
        </footer>
        );
    }

    render() {
        return (
           <div>
              {this.customFooter}
                <div className="footer-txt">
                     {this.props.richText ? this.richTextContent : this.textContent}
                </div>
          </div>
        );
    }
}

MapTo('congaaemreact/components/footer')(Footer);
