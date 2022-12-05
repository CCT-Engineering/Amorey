import React from 'react';
import StyleEntry from './StyleEntry.jsx';
import local from '../../styles/Overview.css';

function Styles({
  currentStyles, currentStyle, setStyle,
}) {
  const name = currentStyle && currentStyle.name ? currentStyle.name : '';

  return (
    <>
      <h5 className={local.styleHead}>
        <span className={local.styleTitle}>Style&nbsp; &gt; &nbsp;</span>
        {name}
      </h5>
      <div className={local.styles}>
        {currentStyles.map(
          style => <StyleEntry
            key={style.style_id}
            id={style.style_id}
            thumb={style.photos[0].thumbnail_url}
            currentStyle={currentStyle}
            setStyle={setStyle}/>
          )}
      </div>
    </>
  )
}

export default Styles;
