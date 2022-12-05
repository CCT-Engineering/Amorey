import React from 'react';
import StyleEntry from './StyleEntry.jsx';
import local from '../../styles/Overview.css';

const Styles = ({currentStyles}) => {
  return (
    <div className={local.styles}>
      {currentStyles.map(currentStyle => <StyleEntry key={currentStyle.style_id} name={currentStyle.name}/>)}
    </div>
  )
}

export default Styles;