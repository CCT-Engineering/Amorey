import React from 'react';
import local from '../../styles/Overview.css';
import { buildHandleEnterKeyPress } from '../../util';

function StyleEntry({
  id, thumb, currentStyle, setStyle,
}) {
  const divStyle = {
    backgroundImage: `url(${thumb})`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    setStyle(id);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={local.style}
      style={divStyle}
      onClick={handleClick}
      onKeyPress={buildHandleEnterKeyPress(handleClick)}>
      {id === currentStyle.style_id ? '✓' : ''}
    </div>
  );
}

export default StyleEntry;
