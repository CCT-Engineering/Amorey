import React from 'react';
import global from '../../styles/global.css';

const Photos = ({ setPhotos, darkMode }) => {
  const handlePhotoSelection = () => {
    setPhotos([]);
    const { files } = event.target;
    if (files.length < 6) {
      const photoArray = [];
      for (let i = 0; i < files.length; i += 1) {
        photoArray.push(URL.createObjectURL(files[i]));
      }
      setPhotos(photoArray);
    } else {
      alert('Please limit photo uploads to 5 or less');
    }
    document.getElementById('uploadPhoto').val = null;
  };

  return (
    <label className={global.photoUploadHeader} htmlFor="photos">
      {'Upload Up To 5 Images (Optional) '}
      <input
        className={darkMode ? global.uploadPhotoDark : global.uploadPhoto}
        aria-label="Photo Upload"
        id="uploadPhoto"
        type="file"
        accept="image/*"
        onChange={handlePhotoSelection}
        multiple
      />
    </label>
  );
};

export default Photos;
