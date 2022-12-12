/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { buildHandleEnterKeyPress, formatImg } from '../../util';

const Img = ({
  src, w, h, alt = 'image', className, onClick = () => {}, onKeyPress = buildHandleEnterKeyPress(onClick),
}) => {
  // console.log('src inside Img:', src)
  const newImgUrl = formatImg(src, w, h);
  /*
  WARNING: img tags should not be used as interactive elements.
  Use buttons or divs with background images instead.
  */
  return (
    <img
      role={onClick ? 'button' : 'img'}
      src={newImgUrl}
      alt={alt}
      tabIndex={0}
      className={className || ''}
      onClick={onClick}
      onKeyPress={onKeyPress}
    />
  );
};

export default Img;
