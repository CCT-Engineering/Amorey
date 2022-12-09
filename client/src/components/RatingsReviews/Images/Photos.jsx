import React, { useState } from 'react';
import PopUp from './PopUpPhoto.jsx';
import { buildHandleEnterKeyPress } from '../../../util';

const Photos = ({ photo }) => {
  const [expandImage, setExpandImage] = useState(false);

  const fullSizeImage = () => {
    setExpandImage(true);
  };

  return (
    <>
      <img
        role="button"
        src={photo.url}
        tabIndex={0}
        alt="text"
        height="48px"
        width="48px"
        onClick={fullSizeImage}
        onKeyPress={buildHandleEnterKeyPress(fullSizeImage)}
      />
      {expandImage && <PopUp url={photo.url} close={setExpandImage} />}
    </>
  );
};

export default Photos;
