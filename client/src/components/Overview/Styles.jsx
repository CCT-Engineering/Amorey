import React from 'react';
import StyleEntry from './StyleEntry.jsx';

const Styles = ({currentStyles}) => {
  return (
    <div className="styles">
      {currentStyles.map(currentStyle => <StyleEntry key={currentStyle.style_id} name={currentStyle.name}/>)}
    </div>
  )
}

export default Styles;