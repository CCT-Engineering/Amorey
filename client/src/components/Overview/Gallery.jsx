import React from 'react';
import local from '../../styles/Overview.css';

const Gallery = () => {
  return (
    <div className={local.gallery}>
      <div className="galleryMain">
        Main Image goes here
      </div>
      <div className="galleryThumbs">
        Thumbnails go here
      </div>
    </div>
  )
}

export default Gallery;