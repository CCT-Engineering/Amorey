import React, {
  useState, useRef, createRef, useEffect,
} from 'react';
import local from '../../styles/Overview/Gallery.css';
import Thumb from './Thumb.jsx';
import Social from './Social.jsx';
import { buildHandleEnterKeyPress, buildHandleKeyDown, formatImg } from '../../util';

// photoIndex prop is the index of the photo currently shown in main view.

function Gallery({
  name, photos, photoIndex, setPhotoIndex, darkMode,
}) {
  const windowHgt = document.documentElement.clientHeight;
  const windowWidth = document.documentElement.clientWidth;
  const MAIN_PHOTO_WID = Math.round(Math.max(windowWidth * 0.8 - 250, 300));
  const MAIN_PHOTO_HGT = 530;
  // TOP_OFFSET is photo offset from top of window.
  const TOP_OFFSET = 135;
  const ZOOM = 2.5;

  const photoDescPrefix = 'Main photo';
  const photoDesc = `${photoDescPrefix} ${photoIndex} of ${name} style`;
  const photoQty = photos.reduce((acc, photo) => acc + (photo.url ? 1 : 0), 0);

  const [expandView, setExpandView] = useState(false);
  const [zoomView, setZoomView] = useState(false);
  const photoUrl = photos[photoIndex] ? photos[photoIndex].url : '';
  const [mainPhotoStyle, setMainPhotoStyle] = useState({});

  // States and Ref below are for expanded view zoom feature
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // image margin offset
  const mousePos = useRef({ x: 0, y: 0 }); // absolute position of cursor

  const thumbRefs = useRef([]);
  thumbRefs.current = photos.map((photo, i) => thumbRefs.current[i] ?? createRef());

  const preloadHigherResImage = (highResPhotoIdx = photoIndex) => {
    const highResPhotoUrl = photos[highResPhotoIdx].url;
    const preloadImage = new Image();
    preloadImage.src = formatImg(highResPhotoUrl, null, windowHgt * 1.5, false);
  };

  useEffect(() => {
    // preload the lowerResImage to create a trigger to preload the higher res
    // once the lowerResImage is finished loading.
    if (photoUrl) {
      const lowerResImage = new Image();
      lowerResImage.src = formatImg(photoUrl, MAIN_PHOTO_WID, MAIN_PHOTO_HGT);
      lowerResImage.onload = () => {
        if (expandView) {
          if (photoIndex + 1 < photos.length) {
            preloadHigherResImage(photoIndex + 1);
            setTimeout(() => preloadHigherResImage(), 800);
          }
          if (photoIndex > 0) {
            preloadHigherResImage(photoIndex - 1);
          }
        } else {
          setTimeout(() => preloadHigherResImage(), 800);
        }
      };
    }
  }, [photoUrl, windowHgt]);

  const handleBtnClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
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
    const newBtn = (
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
    return newBtn;
  }

  const handleMainImgClick = (e) => {
    e.preventDefault();
    let newAttr;
    if (expandView) {
      if (zoomView) {
        newAttr = {
          transform: 'revert',
          cursor: 'crosshair',
          marginTop: `-${TOP_OFFSET}px`,
          marginRight: 'revert',
        };
      } else {
        // if in Expanded View, but not Zoom View
        const { clientX, clientY } = e;
        setOffset({ x: 0, y: TOP_OFFSET });
        mousePos.current = { x: clientX, y: clientY };
        newAttr = {
          transform: `scale(${ZOOM})`,
          cursor: 'zoom-out',
        };
      }
      setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
      setZoomView(!zoomView);
    } else {
      // if NOT in Expanded view
      setExpandView(true);
      newAttr = {
        backgroundImage: `url(${formatImg(photoUrl, null, windowHgt * 1.5, false)})`,
      };
      if (photoIndex + 1 < photos.length) {
        preloadHigherResImage(photoIndex + 1);
      }
      if (photoIndex > 0) {
        preloadHigherResImage(photoIndex - 1);
      }
      setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
    }
  };

  const closeExpView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandView(false);
    const newAttr = {
      transform: '',
      cursor: '',
      marginTop: '',
      marginRight: '',
      backgroundImage: `url(${formatImg(photoUrl, MAIN_PHOTO_WID, MAIN_PHOTO_HGT)})`,
    };
    setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
  };

  // ENABLE ZOOM FEATURE

  const handleMouseMove = (e) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    if (zoomView) {
      setOffset({
        x: offset.x + ZOOM * (mousePos.current.x - clientX),
        y: offset.y - ZOOM * (mousePos.current.y - clientY),
      });
      mousePos.current = { x: clientX, y: clientY };
    }
  };

  // update photo positioning when cursors moves and zoom mode on.
  useEffect(() => {
    const maxYmargin = windowHgt * ((ZOOM - 1) / 2) - TOP_OFFSET;
    const minYmargin = -windowHgt * ((ZOOM - 1) / 2) - TOP_OFFSET;
    let newYmargin;
    if (-offset.y > maxYmargin) {
      newYmargin = maxYmargin;
    } else if (-offset.y < minYmargin) {
      newYmargin = minYmargin;
    } else {
      newYmargin = -offset.y;
    }
    const maxXmargin = windowWidth * ((ZOOM - 1) / 2) - 0;
    const minXmargin = -windowWidth * ((ZOOM - 1) / 2) + 0;
    let newXmargin;
    if (-offset.x > maxXmargin) {
      newXmargin = maxXmargin;
    } else if (-offset.x < minXmargin) {
      newXmargin = minXmargin;
    } else {
      newXmargin = -offset.x;
    }
    const newAttr = { marginTop: newYmargin, marginRight: newXmargin };
    setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
  }, [offset]);

  useEffect(() => {
    if (!photoUrl) {
      setMainPhotoStyle({
        background: 'whitesmoke',
        border: '1px solid #111',
        cursor: 'not-allowed',
      });
    } else if (expandView) {
      setMainPhotoStyle({
        backgroundImage: `url(${formatImg(photoUrl, null, windowHgt * 1.5, false)})`,
      });
    } else {
      setMainPhotoStyle({
        backgroundImage: `url(${formatImg(photoUrl, MAIN_PHOTO_WID, MAIN_PHOTO_HGT)})`,
      });
    }
  }, [photoUrl]);

  const gallerySide = !photoUrl ? '' : (
    <div className={local.gallerySide}>
      {photoIndex > 0
        ? buildBtn(local.thbArrow, 'thumbUp', ['ArrowUp'], '˄')
        : <button type="button" tabIndex={0} className={local.thbArrow}>-</button>}
      <div className={local.galleryThumbs}>
        {photos.map((photo, i) => (
          <Thumb
            key={`${photo.thumbnail_url?.match(/(?<=photo-)(.+)(?=\?)/g)}-${photoIndex}`}
            ref={thumbRefs.current[i]}
            name={name}
            id={i}
            thumbUrl={photo.thumbnail_url}
            photoIndex={photoIndex}
            setPhotoIndex={setPhotoIndex}
          />
        ))}
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
      style={mainPhotoStyle}
      aria-label={photoDesc}
      onClick={photoQty ? handleMainImgClick : () => {}}
      onKeyPress={photoQty ? buildHandleEnterKeyPress(handleMainImgClick) : () => {}}
      onMouseMove={handleMouseMove}
    >
      {photoUrl ? gallerySide : <p className={local.noPhoto}>Photo Unavailable</p>}
      {photoIndex === 0 ? '' : buildBtn(local.left, 'left', ['ArrowLeft'], '⮕')}
      {photoIndex === photoQty - 1 ? '' : buildBtn(local.right, 'right', ['ArrowRight'], '⮕')}
      {expandView
        ? (
          <button
            type="button"
            tabIndex={0}
            className={local.closeExpView}
            onClick={closeExpView}
            onKeyPress={buildHandleEnterKeyPress(closeExpView)}
          >
            x
          </button>
        )
        : <Social darkMode={darkMode} />}
    </div>
  );
}

export default Gallery;
