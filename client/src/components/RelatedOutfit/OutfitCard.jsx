import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Img from '../SharedComponents/Img.jsx';

const OutfitCard = ({ outfitPiece, index, favorites, setFavorites, stars, view }) => {
  const handleDelete = () => {
    event.preventDefault();
    let deleting = view[index];
    let copyFav = favorites.slice();
    copyFav.map((check, favIndex) => {
      if (check === deleting) {
        copyFav.splice(favIndex, 1);
      }
    });
    setFavorites(copyFav);
  };
  const delButton = <button type="button" className={local.action} onClick={handleDelete}>X</button>

  return (
    <div className={local.outfitCard}>
      {outfitPiece.pic ? delButton : ''}
      <div className={local.picContainer}>
        {outfitPiece.pic
          ? <Img src={outfitPiece.pic} w={211} h={221} alt={`Your Outfit: ${outfitPiece.name} img`} className={local.pic}/>
          : (
            <div className={local.noPhoto}>
              {delButton}
              Photo Unavailable
            </div>
          )}
      </div>
      <div className={local.category}>
        {outfitPiece.category}
      </div>
      <h4 className={local.name}>
        {outfitPiece.name}
      </h4>
      <div className={local.price}>
        $
        {outfitPiece.default_price}
      </div>
      <StarDisplay stars={outfitPiece.stars} className={local.star}/>
    </div>
  );
};

export default OutfitCard;
