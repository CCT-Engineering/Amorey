import React, {useState} from 'react';
import OutfitCard from './OutfitCard.jsx';

const OutfitList = () => {
  const [outfitArr, setOutfitArr] = useState([1,2])
  const addOutfit = (curId) => {
    event.preventDefault()
    let copy = outfitArr.slice()
    curId.push(copy)
    setOutfitArr(copy)
  }
  return (
    <div>
      <h4>YOUR OUTFIT</h4>
      <div>carousel-fashion scroll horizontal somehow</div>
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