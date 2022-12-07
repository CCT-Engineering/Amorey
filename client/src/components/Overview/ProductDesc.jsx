import React from 'react';
import local from '../../styles/Overview/ProductDesc.css';
import FeatureEntry from './FeatureEntry.jsx';

function ProductDesc({ current }) {
  let featureId = -1;

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
        {current.features.map(
          (feature) => {
            featureId += 1;
            return (
              <FeatureEntry
                key={featureId}
                featureName={feature.feature}
                featureVal={feature.value}
              />
            );
          },
        )}
      </div>
    </div>
  );
}

export default ProductDesc;
