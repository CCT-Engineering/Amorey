import React from 'react';
import { Link } from 'react-router-dom';
import local from '../../styles/RelatedOutfit.css';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Img from '../SharedComponents/Img.jsx';

const OutfitCard = ({
  favorite, favorites, setFavorites, darkMode,
}) => {
  const handleDelete = () => {
    event.preventDefault();
    setFavorites(favorites.filter((fav) => fav !== favorite));
  };
  const delButton = <button type="button" className={local.action} onClick={handleDelete}>X</button>;

  return (
    <div className={darkMode ? local.outfitCardDark : local.outfitCard}>
      {favorite.pic ? delButton : ''}
      <div className={darkMode ? local.picContainerDark : local.picContainer} role="button">
        <Link to={`/products/${favorite.id}`}>
          {favorite.pic
            ? <Img src={favorite.pic} w={211} h={221} alt={`Your Outfit: ${favorite.name} img`} className={local.pic} />
            : (
              <div className={darkMode ? local.noPhotoDark : local.noPhoto}>
                {delButton}
                Photo Unavailable
              </div>
            )}
        </Link>
      </div>
      <div className={local.category}>
        {favorite.category}
      </div>
      <h4 className={local.name}>
        {favorite.name}
      </h4>
      <div className={local.price}>
        $
        {favorite.default_price}
      </div>
      <div className={local.starContainer}>
        <StarDisplay stars={favorite.stars} className={local.star} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default OutfitCard;
