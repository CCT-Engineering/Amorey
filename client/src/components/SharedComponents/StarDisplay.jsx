import React from 'react';
import global from '../../styles/global.css';

const StarDisplay = ({ stars }) => {
  return (
    <div className={global.Stars} style={{ '--rating': stars }} />
  );
};

export default StarDisplay;
