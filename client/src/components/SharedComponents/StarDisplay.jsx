import React from 'react';
import global from '../../styles/global.css';

const StarDisplay = ({ stars }) => {
  return (
    <div className={global.starContainer}>
      <div className={global.starFill} style={{ width: `${stars * 20}%` }}>
        <div className={global.starOutline}>★★★★★</div>
      </div>
    </div>
  );
};

export default StarDisplay;
