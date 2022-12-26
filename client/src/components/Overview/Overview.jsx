import React, { useState, useEffect, forwardRef } from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
import local from '../../styles/Overview/Overview.css';

const Overview = forwardRef(({
  current, currentStyles, stars, favorites, setFavorites, reviewsQty, darkMode,
}, ref) => {
  const [currentStyle, setCurrentStyle] = useState({ photos: [], skus: {} });
  const [price, setPrice] = useState(current.default_price);
  const [onSale, setOnSale] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const setStylePriceSale = (style) => {
    const styleOnSale = !!style.sale_price;
    setOnSale(styleOnSale);
    setPrice(styleOnSale ? style.sale_price : style.original_price);
  };

  const setStyle = (styleId) => {
    currentStyles.forEach((style) => {
      if (style.style_id === styleId) {
        setCurrentStyle(style);
        setStylePriceSale(style);
        setPhotoIndex(
          style.photos[photoIndex] ? photoIndex : 0,
        );
      }
    });
  };

  useEffect(() => {
    if (currentStyles.length > 0) {
      const style = currentStyles[0];
      setCurrentStyle(style);
      setStylePriceSale(style);
      setPhotoIndex(0);
    }
  }, [currentStyles]);

  return (
    <>
      <div className={local.overviewMain}>
        <Gallery
          name={currentStyle.name}
          photos={currentStyle.photos}
          photoIndex={photoIndex}
          setPhotoIndex={setPhotoIndex}
          darkMode={darkMode}
        />
        <div className={local.infoStylesCart}>
          <ProductInfo
            current={current}
            price={price}
            origPrice={currentStyle.original_price}
            onSale={onSale}
            stars={stars}
            ref={ref}
            favorites={favorites}
            setFavorites={setFavorites}
            currentStyles={currentStyles}
            reviewsQty={reviewsQty}
            darkMode={darkMode}
          />
          <Styles
            currentStyles={currentStyles}
            currentStyle={currentStyle}
            setStyle={setStyle}
            darkMode={darkMode}
          />
          <Cart
            currentStyle={currentStyle}
            darkMode={darkMode}
          />
        </div>
      </div>
      <ProductDesc current={current} darkMode={darkMode} />
    </>
  );
});

export default Overview;
