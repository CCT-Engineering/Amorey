import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites, current }) => {
  const [outfitArr, setOutfitArr] = useState([1,2]);
  const addOutfit = (curId) => {
    event.preventDefault();
    let copy = outfitArr.slice();
    curId.push(copy);
    setOutfitArr(copy);
  };
  const handleDelete = (index) => {
    event.preventDefault();
    let copy = outfitArr.slice();
    copy.splice(index, 1);
    setOutfitArr(copy);
  }
  return (
    <div className={local.outfit}>
      <button>Add Current To Outfit</button>
      {
        outfitArr.map((outfitPiece, index)=>
              <OutfitCard key={index.toString()} outfitPiece={outfitPiece} outfitArr={outfitArr} setOutfitArr={setOutfitArr} index={index} handleDelete={handleDelete}/>
        )
      }
    </div>
  );
};

export default OutfitList;
