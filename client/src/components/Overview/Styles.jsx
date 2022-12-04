import React from 'react';
import StyleEntry from './StyleEntry.jsx';
import local from '../../styles/Overview.css';

const Styles = ({currentStyles, setPrice, setCurrentStyle}) => {
  return (
    <div className={local.styles}>
      {currentStyles.map(style => <StyleEntry key={style.style_id} thumb={style.photos[0].thumbnail_url} setPrice={setPrice} setCurrentStyle={setCurrentStyle}/>)}
    </div>
  )
}

export default Styles;