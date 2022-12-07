import React, { useRef, createRef } from 'react';
import local from '../../styles/Overview/Gallery.css';
import Thumb from './Thumb.jsx';
import { buildHandleEnterKeyPress, buildHandleKeyDown } from '../../util';

// photoIndex prop is the index of the photo currently shown in main view.

function Gallery({
  name, photos, photoIndex, setPhotoIndex,
}) {
  // console.log('photos inside Gallery:', photos);
  const photoUrl = photos[photoIndex] ? photos[photoIndex].url : '';
  const photoDesc = `Photo ${photoIndex} of ${name} style`;
  const photoQty = photos.length || 0;

  const thumbRefs = useRef([]);
  thumbRefs.current = photos.map((photo, i) => thumbRefs.current[i] ?? createRef());

  const divStyle = {
    backgroundImage: `url(${photoUrl})`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newPhotoIndex = photoIndex + (e.target.name === 'left' ? -1 : 1);
    setPhotoIndex(newPhotoIndex);
    // scroll matching (w/ main image) thumb into view
    thumbRefs.current[newPhotoIndex].current.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  function buildBtn(className, btnName, onKeyDownBindings, content) {
    return (
      <button
        type="button"
        tabIndex={0}
        className={className}
        name={btnName}
        onClick={handleClick}
        onKeyPress={buildHandleEnterKeyPress(handleClick)}
        onKeyDown={buildHandleKeyDown(handleClick, onKeyDownBindings)}
      >
        {content}
      </button>
    );
  }

  let photoId = -1;

  return (
    <div className={local.gallery} style={divStyle}>
      <span role="img" aria-label={photoDesc} />
      <div className={local.galleryThumbs}>
        {photos.map(
          (photo) => {
            photoId += 1;
            return (
              <Thumb
                key={photo.thumbnail_url.match(/(?<=photo-)(.+)(?=\?)/g)}
                ref={thumbRefs.current[photoId]}
                name={name}
                id={photoId}
                thumbUrl={photo.thumbnail_url}
                setPhotoIndex={setPhotoIndex}
              />
            );
          },
        )}
      </div>
      {photoIndex === 0 ? '' : buildBtn(local.left, 'left', ['ArrowLeft'], '⬅')}
      {photoIndex === photoQty - 1 ? '' : buildBtn(local.right, 'right', ['ArrowRight'], '⮕')}
    </div>
  );
}

export default Gallery;
