import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites, current, currentStyles, stars}) => {
  const addOutfit = () => {
    event.preventDefault();
    const copy = favorites.slice();
    const currentWPic = current;
    currentWPic.pic = currentStyles[0].photos[0].thumbnail_url;
    copy.push(currentWPic);
    setFavorites(copy);
  };
  return (
    <div className={local.outfit}>
      <button onClick={addOutfit}>Add Current To Outfit</button>
      {
        favorites.map((outfitPiece, index)=>
              <OutfitCard key={index.toString()} outfitPiece={outfitPiece} index={index} favorites={favorites} setFavorites={setFavorites} stars={stars} />
        )
      }
    </div>
  );
};

export default OutfitList;
