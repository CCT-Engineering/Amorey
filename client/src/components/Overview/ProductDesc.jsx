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
          <div className={local.featureName}>
            {current.features.map((feature) => (<p>{feature.feature}</p>))}
          </div>
          <div className={local.featureDivider}>
            {current.features.map(() => (<p>•</p>))}
          </div>
          <div className={local.featureVal}>
            {current.features.map((feature) => (<p>{feature.value}</p>))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDesc;
