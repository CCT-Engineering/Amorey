import React, { useState, useRef, createRef } from 'react';
import local from '../../styles/Overview/Gallery.css';
import Thumb from './Thumb.jsx';
import { buildHandleEnterKeyPress, buildHandleKeyDown, formatImg } from '../../util';

// photoIndex prop is the index of the photo currently shown in main view.

function Gallery({
  name, photos, photoIndex, setPhotoIndex,
}) {
  const MAIN_PHOTO_WID = 390; const MAIN_PHOTO_HGT = 530; const ZOOM_MULTI = 2.5;
  const [expandView, setExpandView] = useState(false);
  const [zoomView, setZoomView] = useState(false);
  // console.log('photos inside Gallery:', photos);
  const photoUrl = photos[photoIndex] ? photos[photoIndex].url : '';
  const photoDescPrefix = 'Main photo';
  const photoDesc = `${photoDescPrefix} ${photoIndex} of ${name} style`;
  const photoQty = photos.length || 0;

  const thumbRefs = useRef([]);
  thumbRefs.current = photos.map((photo, i) => thumbRefs.current[i] ?? createRef());

  let mainPhotoDivStyle;
  if (photoUrl) {
    const w = MAIN_PHOTO_WID * (expandView ? ZOOM_MULTI : 1);
    const h = MAIN_PHOTO_HGT * (expandView ? ZOOM_MULTI : 1);
    mainPhotoDivStyle = {
      backgroundImage: `url(${formatImg(photoUrl, w, h)})`,
    };
  } else {
    mainPhotoDivStyle = {
      background: 'whitesmoke',
      border: '1px solid #111',
      cursor: 'not-allowed',
    };
  }

  const handleBtnClick = (e) => {
    e.preventDefault();
    const decrButtons = ['left', 'thumbUp'];
    const newPhotoIndex = photoIndex + (decrButtons.includes(e.target.name) ? -1 : 1);
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
        onClick={handleBtnClick}
        onKeyPress={buildHandleEnterKeyPress(handleBtnClick)}
        onKeyDown={buildHandleKeyDown(handleBtnClick, onKeyDownBindings)}
      >
        {content}
      </button>
    );
  }

  const handleMainImgClick = (e) => {
    e.preventDefault();
    if (e.target.ariaLabel?.match(/^main photo/i)) {
      if (expandView) {
        setZoomView(!zoomView);
        console.log('zoom!');
      } else {
        setExpandView(true);
      }
    }
  };

  const closeExpView = (e) => {
    e.preventDefault();
    setExpandView(false);
  };

  let photoId = -1;

  const gallerySide = !photoUrl ? '' : (
    <div className={local.gallerySide}>
      {photoIndex > 0
        ? buildBtn(local.thbArrow, 'thumbUp', ['ArrowUp'], '˄')
        : <button type="button" tabIndex={0} className={local.thbArrow}>-</button>}
      <div className={local.galleryThumbs}>
        {photos.map(
          (photo) => {
            photoId += 1;
            return (
              <Thumb
                key={photo.thumbnail_url?.match(/(?<=photo-)(.+)(?=\?)/g)}
                ref={thumbRefs.current[photoId]}
                name={name}
                id={photoId}
                thumbUrl={photo.thumbnail_url}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
              />
            );
          },
        )}
      </div>
      {photoIndex < photoQty - 1
        ? buildBtn(local.thbArrow, 'thumbDn', ['ArrowDown'], '˅')
        : <button type="button" tabIndex={0} className={local.thbArrow}>-</button>}
    </div>
  );

  return (
    <div
      name="mainImg"
      role="button"
      tabIndex={0}
      className={expandView ? local.galleryExp : local.gallery}
      style={mainPhotoDivStyle}
      aria-label={photoDesc}
      onClick={handleMainImgClick}
      onKeyPress={buildHandleEnterKeyPress(handleMainImgClick)}
    >
      {photoUrl ? gallerySide : <p className={local.noPhoto}>Photo Unavailable</p>}
      {photoIndex === 0 ? '' : buildBtn(local.left, 'left', ['ArrowLeft'], '⬅')}
      {photoIndex === photoQty - 1 ? '' : buildBtn(local.right, 'right', ['ArrowRight'], '⮕')}
      {expandView
        ? (
          <button
            type="button"
            className={local.closeExpView}
            onClick={closeExpView}
            onKeyPress={buildHandleEnterKeyPress(handleMainImgClick)}
          >
            x
          </button>
        )
        : ''}
    </div>
  );
}

export default Gallery;
