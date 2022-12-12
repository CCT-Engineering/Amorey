import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';

const OutfitCard = ({ outfitPiece, index, favorites, setFavorites, stars, view }) => {
  const handleDelete = () => {
    event.preventDefault();
    console.log('delete index', index);
    console.log('current favorites', favorites);
    let deleting = view[index];
    let copyFav = favorites.slice();
    copyFav.map((check, favIndex) => {
      if (check === deleting) {
        copyFav.splice(favIndex, 1);
      }
    })
    // setFavorites((previousFavs) => {
    // })
    setFavorites(copyFav);
    // copyView.splice(index, 1);
    console.log('after delete splice', copyFav);

  };
  return (
    <div className={local.outfitCard}>
      <button type="button" className={local.action} onClick={handleDelete}>X</button>
      <center>
        {outfitPiece.pic ? <img src={outfitPiece.pic} alt="card pic" className={local.cardpic}></img> : <p className={local.noPhoto}>Photo Unavailable</p>}
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
