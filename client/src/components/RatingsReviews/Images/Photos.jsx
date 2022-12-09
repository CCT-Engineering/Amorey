import React, { useState } from 'react';
import local from '../../../styles/RatingsReviews/Image/Index.css';
import { buildHandleEnterKeyPress } from '../../../util';

const Photos = ({ photo }) => {
  const [expandImage, setExpandImage] = useState(false);

  return (
    <div
      role="button"
      className={expandImage ? local.modal : null}
      tabIndex={0}
      onClick={() => setExpandImage(!expandImage)}
      onKeyPress={buildHandleEnterKeyPress(() => setExpandImage(!expandImage))}
    >
      <img
        className={expandImage ? local.photo : null}
        src={photo.url}
        alt="text"
        height={expandImage ? 'auto' : '48px'}
        width={expandImage ? 'auto' : '48px'}
      />
    </div>
  );
};

export default Photos;
