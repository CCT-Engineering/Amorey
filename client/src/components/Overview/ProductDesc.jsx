import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';

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
        <div className={local.featuresContainer}>
          <div className={local.featureName} aria-label="feature name">
            {current.features.map((feat) => (<p key={feat.feature}>{feat.feature}</p>))}
          </div>
          <div className={local.featureDivider}>
            {current.features.map((feat) => (<p key={feat.feature}>•</p>))}
          </div>
          <div className={local.featureVal} aria-label="feature value">
            {current.features.map((feat) => (<p key={feat.feature}>{feat.value ?? 'none'}</p>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDesc;
