import React, {useState} from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
import testData from '../../testData.jsx';
import local from '../../styles/Overview.css';

const Overview = () => {

  const [currentStyles, setCurrentStyles] = useState(testData.styleData.results);

  return (
    <div className={local.overview}>
      <h4>OVERVIEW</h4>
      <div className={local.overviewMain}>
        <Gallery />
        <div className={local.infoStylesCart}>
          <ProductInfo />
          <Styles currentStyles={currentStyles}/>
          <Cart />
        </div>
      </div>
        <ProductDesc />
    </div>
  )
}

export default Overview;