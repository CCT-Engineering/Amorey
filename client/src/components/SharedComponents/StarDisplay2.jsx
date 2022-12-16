import React from 'react';
import local from '../../styles/RelatedOutfit.css';

const StarDisplay = ({ stars, darkMode }) => {
  return (
    <div className={`stars ${darkMode ? local.starsDark : local.stars}`} style={{ '--rating': stars }} />
  );
};

export default StarDisplay;
