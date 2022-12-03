import React, {useState} from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';
import Cart from './Cart.jsx';
import ProductDesc from './ProductDesc.jsx';
import testData from '../testData.jsx';

const Overview = () => {

  const [currentStyles, setCurrentStyles] = useState(testData.styleData.results);

  return (
    <div style={{backgroundColor: 'azure'}}>
      <h4>OVERVIEW</h4>
      <Gallery />
      <ProductInfo />
      <Styles currentStyles={currentStyles}/>
      <Cart />
      <ProductDesc />
    </div>
  )
}

export default Overview;