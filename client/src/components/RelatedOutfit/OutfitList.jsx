import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites }) => {
  const [outfitArr, setOutfitArr] = useState([1,2]);
  const addOutfit = (curId) => {
    event.preventDefault();
    let copy = outfitArr.slice();
    curId.push(copy);
    setOutfitArr(copy);
  };
  return (
    <div className={local.outfit}>
      <button>Add Current To Outfit</button>
      {
        outfitArr.map((outfitPiece, index)=>
              <OutfitCard key={index.toString()} outfitPiece={outfitPiece} outfitArr={outfitArr} setOutfitArr={setOutfitArr}/>
        )
      }
    </div>
  );
};

export default OutfitList;
