import React, {useState, useEffect} from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
import testData from '../../testData.jsx';
import local from '../../styles/Overview.css';
import requests from '../../requests.js';

const Overview = ({current}) => {

  const [currentStyles, setCurrentStyles] = useState([]);
  const [currentStyle, setCurrentStyle] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    console.log('current:',current)
    if (current && current.id) {
      requests.getStyles(current.id, (data) => {
        console.log('data.results:', data.results);
        setCurrentStyles(data.results);
        setCurrentStyle(data.results[0]);
      });
    }
  }, [current]);

  return (
    <div className={local.overview}>
      <h4>OVERVIEW</h4>
      <div className={local.overviewMain}>
        <Gallery />
        <div className={local.infoStylesCart}>
          <ProductInfo current={current}/>
          <Styles currentStyles={currentStyles} setPrice={setPrice} setCurrentStyle={setCurrentStyle}/>
          <Cart />
        </div>
      </div>
        <ProductDesc />
    </div>
  )
}

export default Overview;