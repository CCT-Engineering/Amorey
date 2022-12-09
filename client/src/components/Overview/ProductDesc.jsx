import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';
import FeatureEntry from './FeatureEntry.jsx';

function ProductDesc({ current }) {
  return (
    <div className={local.productDesc}>
      <div className={local.sloganDesc}>
        <h4>{current.slogan}</h4>
        <p className={local.desc}>{current.description}</p>
      </div>
      <div className={local.dividerContainer}>
        <div className={local.divider} />
      </div>
      <div className={local.features}>
        {current.features.map((feat) => (<FeatureEntry key={feat.feature} feat={feat} />))}
      </div>
    </div>
  );
}

export default ProductDesc;
