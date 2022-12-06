import React from 'react';
import local from '../../styles/Overview/Thumb.css';
import { buildHandleEnterKeyPress } from '../../util';

function Thumb({
  name, id, thumbUrl, setPhotoIndex,
}) {
  const thumbDesc = `Thumbnail of ${name} style`;
  const divStyle = {
    backgroundImage: `url(${thumbUrl})`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    // fix below - needs to switch to different index
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
