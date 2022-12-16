import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';
import FeatureEntry from './FeatureEntry.jsx';

function ProductDesc({ current, darkMode }) {
  return (
    <div
      className={darkMode ? local.productDescDark : local.productDesc}
      // style={darkMode ? { background: '#1E556C' } : { background: 'revert' }}
    >
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
