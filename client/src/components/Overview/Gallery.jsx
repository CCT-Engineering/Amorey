import React, {
  useState, useRef, createRef, useEffect,
} from 'react';
import local from '../../styles/Overview/Gallery.css';
import Thumb from './Thumb.jsx';
import { buildHandleEnterKeyPress, buildHandleKeyDown, formatImg } from '../../util';

// photoIndex prop is the index of the photo currently shown in main view.

function Gallery({
  name, photos, photoIndex, setPhotoIndex,
}) {
  const [MAIN_PHOTO_WID, MAIN_PHOTO_HGT] = [390, 530];
  // console.log('photos inside Gallery:', photos);
  const photoDescPrefix = 'Main photo';
  const photoDesc = `${photoDescPrefix} ${photoIndex} of ${name} style`;
  const photoQty = photos.length || 0;

  const [expandView, setExpandView] = useState(false);
  const [zoomView, setZoomView] = useState(false);
  const photoUrl = photos[photoIndex] ? photos[photoIndex].url : '';
  const [mainPhotoStyle, setMainPhotoStyle] = useState({});

  // States and Ref below are for expanded view zoom feature
  const [offset, setOffset] = useState({ x: -10, y: 0 }); // image margin offset
  const mousePos = useRef({ x: 0, y: 0 }); // absolute position of cursor

  const thumbRefs = useRef([]);
  thumbRefs.current = photos.map((photo, i) => thumbRefs.current[i] ?? createRef());

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
      let newAttr;
      if (expandView) {
        if (zoomView) {
          newAttr = {
            transform: 'revert',
            cursor: 'crosshair',
            marginTop: '-70px',
            marginRight: 'revert',
          };
        } else {
          // if in Expanded View, but not Zoom View
          const { clientX, clientY } = e;
          setOffset({ x: 0, y: -70 });
          mousePos.current = { x: clientX, y: clientY };
          newAttr = { transform: 'scale(2.5)', cursor: 'zoom-out' };
        }
        setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
        setZoomView(!zoomView);
      } else {
        // if NOT in Expanded view
        setExpandView(true);
        newAttr = {
          backgroundImage: `url(${formatImg(photoUrl, null, null, false)})`,
        };
        setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
      }
    }
  };

  const closeExpView = (e) => {
    e.preventDefault();
    setExpandView(false);
    const newAttr = {
      transform: '',
      cursor: '',
      marginTop: '',
      marginRight: '',
    };
    setMainPhotoStyle((prevStyle) => ({ ...prevStyle, ...newAttr }));
  };

  // ENABLE ZOOM FEATURE

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (zoomView) {
      const { clientX, clientY } = e;
      // console.log('BEFORE change:', offset.x, offset.y);
      // console.log('diff:', mousePos.current.x - clientX, mousePos.current.y - clientY);
      setOffset({
        x: offset.x + (mousePos.current.x - clientX),
        y: offset.y - (mousePos.current.y - clientY),
      });
      mousePos.current = { x: clientX, y: clientY };
      console.log('AFTER change:', offset.x, offset.y);
    }
  };

  // update photo positioning when cursors moves and zoom mode on.
  useEffect(() => {
    const newAttr = { marginTop: -offset.y, marginRight: -offset.x };
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
        backgroundImage: `url(${formatImg(photoUrl, null, null, false)})`,
      });
    } else {
      setMainPhotoStyle({
        backgroundImage: `url(${formatImg(photoUrl, MAIN_PHOTO_WID, MAIN_PHOTO_HGT)})`,
      });
    }
  }, [photoUrl]);

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
      style={mainPhotoStyle}
      aria-label={photoDesc}
      onClick={handleMainImgClick}
      onKeyPress={buildHandleEnterKeyPress(handleMainImgClick)}
      onMouseMove={handleMouseMove}
    >
      {photoUrl ? gallerySide : <p className={local.noPhoto}>Photo Unavailable</p>}
      {photoIndex === 0 ? '' : buildBtn(local.left, 'left', ['ArrowLeft'], '⬅')}
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
        : ''}
    </div>
  );
}

export default Gallery;
