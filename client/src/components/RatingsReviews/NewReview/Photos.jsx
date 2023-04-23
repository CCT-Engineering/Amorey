import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Photos.css';

const Photos = ({ handlePhotoSelection, darkMode }) => (
  <label className={local.header} htmlFor="photos">
    {'Upload Up To 5 Images (Optional) '}
    <input
      className={darkMode ? local.uploadPhotoDark : local.uploadPhoto}
      aria-label="Photo Upload"
      id="uploadPhoto"
      type="file"
      accept="image/*"
      onChange={handlePhotoSelection}
      multiple
    />
  </label>
);

export default Photos;
