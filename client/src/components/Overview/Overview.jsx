import React from 'react';
import Gallery from './Gallery.jsx';
import ProductInfo from './ProductInfo.jsx';
import Styles from './Styles.jsx';

const Overview = () => {
  return (
    <div style={{backgroundColor: 'azure'}}>
      <Gallery />
      <ProductInfo />
      <Styles />
    </div>
  )
}

export default Overview;