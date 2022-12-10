import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites, current, currentStyles, stars}) => {
  const addOutfit = () => {
    event.preventDefault();
    const copy = favorites.slice();
    // const currentWPic = current
    // currentWPic.pic = currentStyles[0].photos[0].thumbnail_url;
    const currentWPic = {
      id: current.id,
      name: current.name,
      category: current.category,
      default_price: current.default_price,
      pic: currentStyles[0].photos[0].thumbnail_url,
      stars: stars,
    }

    console.log('current', current)
    let dupCheck = false
    favorites.forEach((favorite)=>{
      if (favorite.id === currentWPic.id) {
        dupCheck=true
        console.log('was dup')
      }
    })
    if (dupCheck === false) {
      copy.push(currentWPic);
      setFavorites(copy);
      }
    // if (favorites.includes(currentWPic)) {
    //   console.log('already got dup')
    // } else {
    //   copy.push(currentWPic);
    //   setFavorites(copy);
    // }
    // console.log('current', current)
    // console.log('favs', favorites)

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
