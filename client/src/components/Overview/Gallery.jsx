import React, {
  useState, useRef, createRef, useEffect,
} from 'react';
import local from '../../styles/Overview/Gallery.css';
import global from '../../styles/global.css';
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
  const TOP_OFFSET = 100;
  const ZOOM = 2.5;
  const lowerResImage = useRef(new Image());
  const highResImage = useRef(new Image());

  const photoDescPrefix = 'Main photo';
  const photoDesc = `${photoDescPrefix} ${photoIndex} of ${name} style`;
  const photoQty = photos.reduce((acc, photo) => acc + (photo.url ? 1 : 0), 0);

  const [expandView, setExpandView] = useState(false);
  // const expandViewRef = useRef(expandView);
  // useEffect(() => {
  //   expandViewRef.current = expandView;
  // }, [expandView]);

  const [zoomView, setZoomView] = useState(false);
  const [mainPhotoClass, setMainPhotoClass] = useState(`${local.galleryLoading} ${global.skeleton}`);
  const [mainPhotoStyle, setMainPhotoStyle] = useState({});

  // States and Ref below are for expanded view zoom feature
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // image margin offset
  const mousePos = useRef({ x: 0, y: 0 }); // absolute position of cursor

  const thumbRefs = useRef([]);
  thumbRefs.current = photos.map((_, i) => thumbRefs.current[i] ?? createRef());

  const formatHighResImgSrcStr = (photoIdx) => (
    formatImg(photos[photoIdx].url, null, windowHgt * 1.5, false)
  );
  const formatLowResImgSrcStr = (photoIdx) => (
    formatImg(photos[photoIdx].url, MAIN_PHOTO_WID, MAIN_PHOTO_HGT)
  );

  const getNextImgObj = (isViewExpanded) => {
    return (isViewExpanded ? highResImage : lowerResImage).current;
  };

  const changeMainPhotoClassStyle = (isViewExpanded) => {
    const imgObj = getNextImgObj(isViewExpanded);
    if (imgObj.src && imgObj.complete) { // main product photo is loaded
      const newAttr = { backgroundImage: `url(${imgObj.src})` };
      setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
      setMainPhotoClass(isViewExpanded ? local.galleryExp : local.gallery);
      return true; // means image is loaded
    }
    setMainPhotoStyle({});
    setMainPhotoClass(`${local[isViewExpanded ? 'galleryExpLoading' : 'galleryLoading']} ${global.skeleton}`);
    return false; // means image still loading
  };

  const loadAdjHighResImgs = (photoIdx) => {
    if (photoIdx + 1 < photos.length) {
      (new Image()).src = formatHighResImgSrcStr(photoIdx + 1);
    }
    if (photoIdx > 0) {
      (new Image()).src = formatHighResImgSrcStr(photoIdx - 1);
    }
  };

  const changePhotoInNonExpMode = () => {
    lowerResImage.current.src = formatLowResImgSrcStr(photoIndex);

    changeMainPhotoClassStyle(false);

    lowerResImage.current.onload = () => {
      changeMainPhotoClassStyle(false);
      highResImage.current.src = formatHighResImgSrcStr(photoIndex);
      loadAdjHighResImgs(photoIndex);
    };
  };

  const changePhotoInExpMode = () => {
    highResImage.current.src = formatHighResImgSrcStr(photoIndex);

    changeMainPhotoClassStyle(true);

    highResImage.current.onload = () => {
      changeMainPhotoClassStyle(true);
      lowerResImage.current.src = formatLowResImgSrcStr(photoIndex);
      loadAdjHighResImgs(photoIndex);
    };
  };

  useEffect(() => {
    if (photos[photoIndex]?.url) {
      if (expandView) {
        changePhotoInExpMode();
      } else {
        changePhotoInNonExpMode();
      }
    } else {
      setMainPhotoStyle({
        background: 'whitesmoke',
        border: '1px solid #111',
        cursor: 'not-allowed',
      });
    }
    return () => {
      // Cancel any ongoing image loading or state updates
      lowerResImage.current.onload = null;
      highResImage.current.onload = null;
    };
  }, [photos, photoIndex]);

  const handleArrowBtnClick = (e) => {
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

  function buildArrowBtn(className, btnName, onKeyDownBindings, content) {
    return (
      <button
        type="button"
        tabIndex={0}
        className={className}
        name={btnName}
        onClick={handleArrowBtnClick}
        onKeyPress={buildHandleEnterKeyPress(handleArrowBtnClick)}
        onKeyDown={buildHandleKeyDown(handleArrowBtnClick, onKeyDownBindings)}
      >
        {content}
      </button>
    );
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
        setOffset({ x: 0, y: TOP_OFFSET });
        mousePos.current = { x: e.clientX, y: e.clientY };
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

      if (!changeMainPhotoClassStyle(true)) {
        highResImage.current.onload = () => {
          changeMainPhotoClassStyle(true);
        };
      }
    }
  };

  const closeExpView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandView(false);
    changeMainPhotoClassStyle(false);
    const newAttr = {
      transform: '',
      cursor: '',
      marginTop: '',
      marginRight: '',
      backgroundImage: `url(${lowerResImage.current.src})`,
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

  const gallerySide = !photos[photoIndex]?.url ? '' : (
    <div className={local.gallerySide}>
      {photoIndex > 0
        ? buildArrowBtn(local.thbArrow, 'thumbUp', ['ArrowUp'], '˄')
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
        ? buildArrowBtn(local.thbArrow, 'thumbDn', ['ArrowDown'], '˅')
        : <button type="button" tabIndex={0} className={local.thbArrow}>-</button>}
    </div>
  );

  const setPointerEvents = () => {
    const imgObj = getNextImgObj(expandView);
    return imgObj.src && imgObj.complete ? 'auto' : 'none';
  };

  return (
    <div
      name="mainImg"
      role="button"
      tabIndex={0}
      className={mainPhotoClass}
      style={{ ...mainPhotoStyle, pointerEvents: setPointerEvents() }}
      aria-label={photoDesc}
      onClick={photoQty ? handleMainImgClick : () => {}}
      onKeyPress={photoQty ? buildHandleEnterKeyPress(handleMainImgClick) : () => {}}
      onMouseMove={handleMouseMove}
    >
      {photos[photoIndex]?.url ? gallerySide : <p className={local.noPhoto}>Photo Unavailable</p>}
      {photoIndex === 0 ? '' : buildArrowBtn(local.left, 'left', ['ArrowLeft'], '⮕')}
      {photoIndex === photoQty - 1 ? '' : buildArrowBtn(local.right, 'right', ['ArrowRight'], '⮕')}
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
