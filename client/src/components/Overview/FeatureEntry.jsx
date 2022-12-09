import React from 'react';
import local from '../../styles/Overview/Feature.css';

function FeatureEntry({ feat }) {
  return (
    <div className={local.feature}>
      <div className={local.featureName}>{feat.feature}</div>
      <div className={local.featureDivider}>•</div>
      <div className={local.featureVal}>{feat.value ?? 'none'}</div>
    </div>
  );
}

export default FeatureEntry;
