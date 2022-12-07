import React from 'react';
import local from '../../styles/Overview/Thumb.css';
import { buildHandleEnterKeyPress } from '../../util';

// photoIndex prop is the index of the photo currently shown in main view.

function Thumb({
  name, id, thumbUrl, setPhotoIndex,
}) {
  const thumbDesc = `Thumbnail of ${name} style`;
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
      aria-label={thumbDesc}
      tabIndex={0}
      className={local.thumb}
      style={divStyle}
      onClick={handleClick}
      onKeyPress={buildHandleEnterKeyPress(handleClick)}
    />
  );
}

export default Thumb;
