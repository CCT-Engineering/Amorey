import React, { useState, useEffect } from 'react';
import local from '../../styles/Overview/Cart.css';

function Cart({ currentStyle, darkMode }) {
  const [stock, setStock] = useState({});
  const [curSize, setCurSize] = useState('');

  function getTotalStock(style) {
    let totalStock = 0;
    Object.keys(style.skus).forEach((sku) => {
      if (style.skus[sku] && style.skus[sku].quantity) {
        totalStock += style.skus[sku].quantity;
      }
    });
    return totalStock;
  }

  function changeSize(e) {
    setCurSize(e.target.value);
  }

  function collectCartData(e) {
    e.preventDefault();
  }

  function handleCartClick(e) {
    e.preventDefault();
    alert('Item Added!');
  }

  useEffect(() => {
    const stockObj = {};
    Object.keys(currentStyle.skus).forEach((sku) => {
      const curSKU = currentStyle.skus[sku];
      if (curSKU !== null && curSKU.size !== null) {
        if (stockObj[curSKU.size]) {
          stockObj[curSKU.size] += curSKU.quantity;
        } else if (curSKU.quantity) {
          stockObj[curSKU.size] = curSKU.quantity;
        }
      }
      // document.getElementById('Size').target?.value('Select Size');
      // document.getElementById('Size').defaultValue = 'Select Size';
      // console.log(document.getElementById('Size'))
    });
    setStock(stockObj);
  }, [currentStyle]);

  const addToCartStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  };

  return (
    <div className={local.cart}>
      <form id="cart" onSubmit={collectCartData}>
        <div className={local.sizeQty}>
          <select
            className={darkMode ? local.buttonDark : local.button}
            role="menu"
            id="Size"
            disabled={getTotalStock(currentStyle) ? null : true}
            onChange={changeSize}
            defaultValue="Select Size"
            required
          >
            <option value="Select Size" disabled>
              {getTotalStock(currentStyle) ? 'SELECT SIZE' : 'OUT OF STOCK'}
            </option>
            {Object.keys(stock).map((size) => (<option value={size} key={size}>{size}</option>))}
          </select>
          <select
            className={darkMode ? local.buttonDark : local.button}
            style={{ marginLeft: '15px' }}
            role="menu"
            id="Quantity"
            disabled={getTotalStock(currentStyle) ? null : true}
            defaultValue="Default"
            required
          >
            <option value="Default" disabled>-</option>
            {[...Array(15).keys()].slice(1, Math.min(15, stock[curSize]) - 1).map((val) => (
              <option value={val} key={`qty ${val}`}>{val}</option>
            ))}
          </select>
        </div>
        <div className={local.addToCart}>
          {getTotalStock(currentStyle)
            ? (
              <button
                className={darkMode ? local.buttonDark : local.button}
                type="submit"
                style={addToCartStyle}
                onClick={handleCartClick}
              >
                <div>ADD TO CART</div>
                <div>+</div>
              </button>
            ) : ''}
        </div>
      </form>
    </div>
  );
}

export default Cart;
