import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Img from '../SharedComponents/Img.jsx';
import requests from '../../requests.js';

const OutfitCard = ({
  outfitPiece, index, favorites, setFavorites, view, darkMode, setCurrent,
}) => {
  const handleDelete = () => {
    event.preventDefault();
    const deleting = view[index];
    const copyFav = favorites.slice();
    copyFav.map((check, favIndex) => check === deleting && copyFav.splice(favIndex, 1));
    setFavorites(copyFav);
  };
  const delButton = <button type="button" className={local.action} onClick={handleDelete}>X</button>;

  const handleChangeCurrent = (e) => {
    e.preventDefault();
    requests.getProductInfo(outfitPiece.id, (info) => {
      setCurrent(info);
    });
  };

  return (
    <div className={darkMode ? local.outfitCardDark : local.outfitCard}>
      {outfitPiece.pic ? delButton : ''}
      <div className={darkMode ? local.picContainerDark : local.picContainer} role="button">
        {outfitPiece.pic
          ? <Img src={outfitPiece.pic} w={211} h={221} alt={`Your Outfit: ${outfitPiece.name} img`} onClick={handleChangeCurrent} className={local.pic} />
          : (
            <div className={darkMode ? local.noPhotoDark : local.noPhoto}>
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
      <div className={local.starContainer}>
        <StarDisplay stars={outfitPiece.stars} className={local.star} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default OutfitCard;
