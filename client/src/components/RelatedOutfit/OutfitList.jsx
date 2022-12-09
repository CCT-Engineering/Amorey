import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites, current }) => {
  const addOutfit = () => {
    event.preventDefault();
    const copy = favorites.slice();
    const currentWPic = current;
    currentWPic.pic = 'pic from styles';
    copy.push(currentWPic);
    // console.log('copy before set', copy);
    setFavorites(copy);
  };
  return (
    <div className={local.outfit}>
      <button onClick={addOutfit}>Add Current To Outfit</button>
      {
        favorites.map((outfitPiece, index)=>
              <OutfitCard key={index.toString()} outfitPiece={outfitPiece} index={index} favorites={favorites} setFavorites={setFavorites}/>
        )
      }
    </div>
  );
};

export default OutfitList;
