import React from 'react';
import local from '../../styles/Overview.css';

const StyleEntry = ({thumb, setPrice}) => {

  const bgImgStr = `background-image: url('${thumb}')`

  const divStyle = {
    backgroundImage: `url(${thumb})`,
    height: '50px'
  }

  return (
    <div className={local.style} style={divStyle}>
      {/* <img className={local.styleThumb} src={thumb} /> */}
    </div>
  )
}

export default StyleEntry;