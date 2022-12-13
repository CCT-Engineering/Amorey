import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Img from '../SharedComponents/Img.jsx';

const OutfitCard = ({ outfitPiece, index, favorites, setFavorites, stars, view }) => {
  const handleDelete = () => {
    event.preventDefault();
    // console.log('delete index', index);
    // console.log('current favorites', favorites);
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
    // console.log('after delete splice', copyFav);
  };
  const delButton = <button type="button" className={local.action} onClick={handleDelete}>X</button>

  return (
    <div className={local.outfitCard}>
      {/* <button type="button" className={local.action} onClick={handleDelete}>X</button> */}
      {outfitPiece.pic ? delButton : ''}
      <center>
        {outfitPiece.pic
          ? <Img src={outfitPiece.pic} w={177} h={192} alt="card pic"/>
          : (
            <div className={local.noPhoto}>
              {delButton}
              Photo Unavailable
            </div>
          )}
      </center>
      <div>
        {/* Category: */}
        {outfitPiece.category}
      </div>
      <b>
        {/* Name: */}
        {outfitPiece.name}
      </b>
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
