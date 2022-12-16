import React, { useState, useEffect } from 'react';
import local from '../../styles/Overview/Cart.css';

function Cart({ currentStyle, darkMode }) {
  const [stock, setStock] = useState({});
  const [curSize, setCurSize] = useState('');
  const [stockTotal, setStockTotal] = useState(0);
  const [curQty, setCurQty] = useState(0);

  function changeSize(e) {
    setCurSize(e.target.value);
  }

  function changeQty(e) {
    setCurQty(e.target.value);
  }

  function collectCartData(e) {
    e.preventDefault();
  }

  function handleCartClick(e) {
    e.preventDefault();
    if (curSize && curQty) {
      alert('Item Added!');
    } else if (curSize) {
      // console.log('Please select a quantity');
      // const dropdown = document.getElementById('Quantity');
      // select dropdown
    } else {
      // console.log('Please select a size');
      // const dropdown = document.getElementById('Size');
      // select dropdown
    }
  }

  useEffect(() => {
    let totalStock = 0;
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
      if (curSKU && curSKU.quantity) {
        totalStock += curSKU.quantity;
      }
    });
    setStock(stockObj);
    setStockTotal(totalStock);
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
            style={{ marginRight: '15px' }}
            id="Size"
            aria-label="select size"
            disabled={stockTotal ? null : true}
            onChange={changeSize}
            defaultValue="Select Size"
            required
          >
            <option value="Select Size" disabled>
              {stockTotal ? 'SELECT SIZE' : 'OUT OF STOCK'}
            </option>
            {Object.keys(stock).map((size) => (
              stock[size] > 0 && <option value={size} key={size}>{size}</option>))}
          </select>
          <select
            className={darkMode ? local.buttonDark : local.button}
            id="select quantity"
            aria-label="Quantity"
            onChange={changeQty}
            disabled={stockTotal ? null : true}
            defaultValue="Default"
            required
          >
            <option value="Default" disabled>-</option>
            {[...Array(16).keys()].slice(1, Math.min(15, stock[curSize]) + 1).map((val) => (
              <option value={val} key={`qty ${val}`}>{val}</option>
            ))}
          </select>
        </div>
        <div className={local.addToCart}>
          {stockTotal
            ? (
              <button
                className={darkMode ? local.buttonDark : local.button}
                type="submit"
                aria-label="add to cart"
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
