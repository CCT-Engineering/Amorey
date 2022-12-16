import React from 'react';
import global from '../../styles/global.css';

const StarDisplay = ({ stars, darkMode }) => {
  return (
    <div className={`stars ${darkMode ? global.starsDark : global.stars}`} style={{ '--rating': stars }} />
  );
};

export default StarDisplay;
