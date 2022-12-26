import React from 'react';
import local from '../../styles/Overview/Feature.css';

function FeatureEntry({ feat }) {
  function parseStr(str) {
    return !str ? 'none' : str.split(' ').reduce((acc, val) => (
      `${acc} ${val.split(/(?=[A-Z])/).join(' ')}`
    ), '').trim();
  }

  return (
    <div className={local.feature}>
      <div className={local.featureName}>{feat.feature}</div>
      <div className={local.featureDivider}>•</div>
      <div className={local.featureVal}>{parseStr(feat.value)}</div>
    </div>
  );
}

export default FeatureEntry;
