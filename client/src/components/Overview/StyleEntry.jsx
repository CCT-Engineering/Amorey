import React from 'react';
import local from '../../styles/Overview/StyleEntry.css';
import { buildHandleEnterKeyPress, formatImg } from '../../util';

function StyleEntry({
  style, currentStyle, setStyle, darkMode,
}) {
  const styleThumbUrl = style.photos[0].thumbnail_url;
  let divStyle;
  if (styleThumbUrl) {
    divStyle = {
      backgroundImage: `url(${formatImg(styleThumbUrl, 70, 70)})`,
    };
    divStyle = darkMode ? { ...divStyle, border: '1px solid #B6D8C4' } : divStyle;
  } else {
    divStyle = {
      background: 'whitesmoke',
      textAlign: 'center',
    };
  }

  const styleThumbDesc = `Main Thumbnail ${style.name} style`;

  const handleClick = (e) => {
    e.preventDefault();
    setStyle(style.style_id);
  };

  return (
    <div
      role="button"
      aria-label={styleThumbDesc}
      tabIndex={0}
      className={local.style}
      style={divStyle}
      onClick={handleClick}
      onKeyPress={buildHandleEnterKeyPress(handleClick)}
    >
      {styleThumbUrl ? '' : <div className={local.noThumb}>{style.name}</div>}
      {style.style_id === currentStyle.style_id ? '✓' : ''}
    </div>
  );
}

export default StyleEntry;
