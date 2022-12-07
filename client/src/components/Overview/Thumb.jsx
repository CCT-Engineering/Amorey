import React, { forwardRef } from 'react';
import local from '../../styles/Overview/Thumb.css';
import { buildHandleEnterKeyPress } from '../../util';

// { name, id, thumbUrl, setPhotoIndex }

// photoIndex prop is the index of the photo currently shown in main view.

const Thumb = forwardRef((props, ref) => {
  const {
    name, id, thumbUrl, setPhotoIndex,
  } = props;

  const thumbDesc = `Thumbnail ${id} of ${name} style`;
  const divStyle = {
    backgroundImage: `url(${thumbUrl})`,
  };

  const handleClick = (e) => {
    e.preventDefault();
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
