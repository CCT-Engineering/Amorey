import React from 'react';
import StyleEntry from './StyleEntry.jsx';
import local from '../../styles/Overview/Styles.css';

function Styles({
  currentStyles, currentStyle, setStyle,
}) {
  return (
    <>
      <h5 className={local.styleHead}>
        <span className={local.styleTitle}>Style&nbsp; &gt; &nbsp;</span>
        {currentStyle.name}
      </h5>
      <div className={local.styles}>
        {currentStyles.map(
          (style) => (
            <StyleEntry
              key={style.style_id}
              id={style.style_id}
              thumb={style.photos[0].thumbnail_url}
              currentStyle={currentStyle}
              setStyle={setStyle}
            />
          ),
        )}
      </div>
    </>
  );
}

export default Styles;
