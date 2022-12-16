import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';
import FeatureEntry from './FeatureEntry.jsx';

function ProductDesc({ current, darkMode }) {
  const productDescBackground = darkMode
    ? { background: '#1E556C' }
    : { background: 'rgb(172, 233, 222)' };

  const dividerColor = darkMode
    ? { background: '#B6D8C4' }
    : { background: '#555' };

  return (
    <div
      className={local.productDesc}
      style={productDescBackground}
    >
      <div className={local.sloganDesc}>
        <h4>{current.slogan}</h4>
        <p className={local.desc}>{current.description}</p>
      </div>
      <div className={local.dividerContainer}>
        <div
          className={local.divider}
          style={dividerColor}
        />
      </div>
      <div className={local.features}>
        {current.features.map((feat) => (<FeatureEntry key={feat.feature} feat={feat} />))}
      </div>
    </div>
  );
}

export default ProductDesc;
