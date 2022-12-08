import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';

const OutfitCard = ({ outfitPiece, outfitArr, setOutfitArrm, index, handleDelete }) => {
  const addOutfit = (curId) => {
    event.preventDefault();
    let copy = outfitArr.slice();
    curId.push(copy);
    setOutfitArr(copy);
  }
  // axios.get('prod info by id GET /products/:product_id')
  // .then((response)=>{
  //   let info = response.data
  const exRC = {
    "id": 11,
    "name": "Air Minis 250",
    "slogan": "Full court support",
    "description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
    "category": "Basketball Shoes",
    "default_price": "0",
    "features": [
      {
        "feature": "Sole",
        "value": "Rubber"
      },
      {
        "feature": "Material",
        "value": "FullControlSkin"
      },
    ],
  }
  let info = exRC;
  return (
    <div className={local.outfitCard}>
      <button type="button" className={local.action}>X</button>
      <div>-----Outfit Card -----</div>
      <div>click nav to detailed product page somehow</div>
      <div>
        category:
        {info.category}
      </div>
      <div>
        name:
        {info.name}
      </div>
      <div>
        price:
        {info.default_price}
      </div>
      <div>Star Rating: get from Thomas state</div>
      <div>img: figure out image here</div>
    </div>
  );
  // })

};

export default OutfitCard;