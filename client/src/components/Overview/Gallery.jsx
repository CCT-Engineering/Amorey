import React from 'react';
import local from '../../styles/Overview.css';

const Gallery = () => {
  return (
    <div className={local.gallery}>
      <div className={local.galleryMain}>
        Main Image goes here
      </div>
      <div className={local.galleryThumbs}>
        Thumbnails go here
      </div>
    </div>
  )
}

export default Gallery;