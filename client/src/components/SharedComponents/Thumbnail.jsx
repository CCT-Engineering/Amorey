import React, { useState } from 'react';
import global from '../../styles/global.css';
import { buildHandleEnterKeyPress } from '../../util';

const Photos = ({ photo }) => {
  const [expandImage, setExpandImage] = useState(false);
  let res = photo.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g);
  res = res === null ? null : res;

  return (
    <>
      <div
        aria-label="Thumbnail"
        role="button"
        className={global.thumbnailMain}
        tabIndex={0}
        onClick={() => setExpandImage(!expandImage)}
        onKeyPress={buildHandleEnterKeyPress(() => setExpandImage(!expandImage))}
      >
        <img
          className={global.thumbnail}
          src={res}
          alt="text"
          height="48px"
          width="48px"
        />
      </div>
      {expandImage && (
        <div
          role="button"
          aria-label="Thumbnail Expanded"
          className={global.photoModal}
          tabIndex={0}
          onClick={() => setExpandImage(!expandImage)}
          onKeyPress={buildHandleEnterKeyPress(() => setExpandImage(!expandImage))}
        >
          <img
            className={global.photo}
            src={res}
            alt="text"
          />
        </div>
      )}
    </>
  );
};

export default Photos;
