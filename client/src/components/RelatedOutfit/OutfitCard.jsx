import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';

const OutfitCard = ({ outfitPiece, index, favorites, setFavorites }) => {
  // console.log('index', index);
  const handleDelete = () => {
    event.preventDefault();
    let copy = favorites.slice();
    copy.splice(index, 1);
    // console.log('deleting', copy);
    setFavorites(copy);
  };
  return (
    <div className={local.outfitCard}>
      <button type="button" className={local.action} onClick={handleDelete}>X</button>
      {/* <button type="button" className={local.action}>X</button> */}
      <div>{outfitPiece.pic}</div>
      <div>
        Category:
        {outfitPiece.category}
      </div>
      <div>
        Name:
        {outfitPiece.name}
      </div>
      <div>
        Price:
        {outfitPiece.default_price}
      </div>
      <div>Star Rating: get from Thomas state</div>

    </div>
  );
  // })

};

export default OutfitCard;