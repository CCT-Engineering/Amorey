import React from 'react';
import local from '../../styles/Overview/FeatureEntry.css';

function FeatureEntry({
  featureName, featureVal,
}) {
  return (
    // <div className={local.feature}>
    //   <span className={local.featureName}>{featureName}</span>
    //   <span className={local.featureVal}>
    //     &nbsp;&nbsp;|&nbsp;&nbsp;
    //     {featureVal}
    //   </span>
    // </div>
    <div className={local.feature}>
      <div className={local.featureName}>{featureName}</div>
      <div className={local.divider}>•</div>
      <div className={local.featureVal}>{featureVal}</div>
    </div>
  );
}

export default FeatureEntry;
