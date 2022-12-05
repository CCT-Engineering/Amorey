import React from 'react';
import local from '../../styles/Overview.css';

const StyleEntry = ({id, thumb, currentStyle, setStyle}) => {

  const divStyle = {
    backgroundImage: `url(${thumb})`
  }

  const handleClick = (e) => {
    e.preventDefault();
    setStyle(id);
  }

  return (
    <div className={local.style} style={divStyle} onClick={handleClick}>
      {id === currentStyle.style_id ? '✓' : ''}
    </div>
  )
}

export default StyleEntry;