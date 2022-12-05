import React, { useState, useEffect } from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
// import testData from '../../testData.jsx';
import local from '../../styles/Overview.css';
import requests from '../../requests.js';

function Overview({ current }) {
  const [currentStyles, setCurrentStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState({});
  const [price, setPrice] = useState(current.default_price);
  const [onSale, setOnSale] = useState(false);

  useEffect(() => {
    if (current && current.id) {
      requests.getStyles(current.id, (data) => {
        setCurrentStyles(data.results);
        const style = data.results[0];
        setCurrentStyle(data.results[0]);
        const styleOnSale = !!style.sale_price;
        setOnSale(styleOnSale);
        setPrice(styleOnSale ? style.sale_price : style.original_price);
      });
    }
  }, [current]);

  const setStyle = (styleId) => {
    currentStyles.forEach((style) => {
      if (style.style_id === styleId) {
        setCurrentStyle(style);
        setOnSale(!!style.sale_price);
        setPrice(style.sale_price ? style.sale_price : style.original_price);
      }
    });
  };

  return (
    <div className={local.overview}>
      <div className={local.overviewMain}>
        <Gallery />
        <div className={local.infoStylesCart}>
          <ProductInfo
            current={current}
            price={price}
            origPrice={currentStyle.original_price}
            onSale={onSale}
          />
          <Styles
            currentStyles={currentStyles}
            currentStyle={currentStyle}
            setStyle={setStyle}
          />
          <Cart />
        </div>
      </div>
      <ProductDesc />
    </div>
  );
}

export default Overview;
