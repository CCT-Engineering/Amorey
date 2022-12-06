import React from 'react';
import local from '../../styles/Overview/Gallery.css';
import Thumb from './Thumb.jsx';
import { buildHandleEnterKeyPress, buildHandleKeyDown } from '../../util';

function Gallery({
  name, photos, photoIndex, setPhotoIndex,
}) {
  console.log('photos inside Gallery:', photos);
  const photoUrl = photos && photos[photoIndex] ? photos[photoIndex].url : '';
  const photoDesc = `Photo ${photoIndex} of ${name} style`;
  const photoQty = photos ? photos.length : 0;

  const divStyle = {
    backgroundImage: `url(${photoUrl})`,
  };

  const handleClick = (e) => {
    e.preventDefault();
    setPhotoIndex((prevIndex) => prevIndex + (e.target.name === 'left' ? -1 : 1));
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

// https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80

export default Gallery;
