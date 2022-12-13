import React from 'react';
import local from '../../styles/Overview/Cart.css';

function Cart() {
  return (
    <div className={local.cart}>
      <div className={local.sizeQty}>
        <select className={"darkMode" ? local.sizeQtyMenu : local.sizeQtyMenu} role="menu" id="Size">
          <option value="relevant">relevance</option>
          <option value="newest">newest</option>
          <option value="helpful">helpful</option>
        </select>
      </div>
      <p>This will be the cart</p>
    </div>
  );
}

export default Cart;
