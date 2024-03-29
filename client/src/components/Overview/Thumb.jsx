import React, { forwardRef } from 'react';
import local from '../../styles/Overview/Thumb.css';
import { buildHandleEnterKeyPress, formatImg } from '../../util';

// { name, id, thumbUrl, setPhotoIndex }

// photoIndex prop is the index of the photo currently shown in main view.

const Thumb = forwardRef(({
  name, id, thumbUrl, photoIndex, setPhotoIndex,
}, ref) => {
  const thumbDesc = `Thumbnail ${id} of ${name} style`;
  const divStyle = {
    backgroundImage: `url(${formatImg(thumbUrl, 60, 60)})`,
    border: id === photoIndex ? '1px solid blue' : '1px solid #111',
    opacity: id === photoIndex ? '1.0' : '0.7',
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPhotoIndex(id);
  };

  return (
    <div
      role="button"
      ref={ref}
      aria-label={thumbDesc}
      tabIndex={0}
      className={local.thumb}
      style={divStyle}
      onClick={handleClick}
      onKeyPress={buildHandleEnterKeyPress(handleClick)}
    />
  );
});

export default Thumb;
