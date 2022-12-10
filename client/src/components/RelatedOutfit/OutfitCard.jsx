import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';

const OutfitCard = ({ outfitPiece, index, favorites, setFavorites, stars }) => {
  const handleDelete = () => {
    event.preventDefault();
    let copy = favorites.slice();
    copy.splice(index, 1);
    setFavorites(copy);
  };
  return (
    <div className={local.outfitCard}>
      <button type="button" className={local.action} onClick={handleDelete}>X</button>
      <center>
        <img src={outfitPiece.pic} alt="card pic" className={local.cardpic}></img>
      </center>
      <div>
        {/* Category: */}
        {outfitPiece.category}
      </div>
      <div>
        {/* Name: */}
        {outfitPiece.name}
      </div>
      <div>
        {/* Price: */}
        $
        {outfitPiece.default_price}
      </div>
      <StarDisplay stars={outfitPiece.stars} />
    </div>
  );
};

export default OutfitCard;