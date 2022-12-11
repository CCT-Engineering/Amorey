import React from 'react';
import global from '../../styles/global.css';
import { buildHandleEnterKeyPress, formatImg } from '../../util';

const Img = ({
  src, w, h, alt = 'image', handleClick, handleKeyPress = buildHandleEnterKeyPress(handleClick),
}) => {
  const newImgUrl = formatImg(src, w, h);
  return (
    <div className={global.Stars} style={{ '--rating': stars }} />
  );
};

export default Img;
