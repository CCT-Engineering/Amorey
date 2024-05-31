import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const OutfitList = ({
  favorites, setFavorites, current, currentStyles, stars, darkMode, carouselWidth,
}) => {
  const [viewStart, setViewStart] = useState(0);

  const CARD_WIDTH = 240; // must be manually set
  const carouselWidthReduced = carouselWidth - CARD_WIDTH;
  const cardQty = carouselWidthReduced > 0 ? Math.floor(carouselWidthReduced / CARD_WIDTH) : 0;

  // Note: viewEnd below is exclusive
  const viewEnd = viewStart + cardQty > favorites.length
    ? favorites.length
    : viewStart + cardQty;
  // NEXT TASK: IF AT END OF CARD LIST AND ONE IS ADDED, WE WANT TO EXTEND THE BEGINNING

  const preClick = (event) => {
    event.preventDefault();
    if (viewStart === 0) {
      return;
    }
    const newViewStart = viewStart - 1;
    setViewStart(newViewStart);
  };

  const nextClick = (event) => {
    event.preventDefault();
    if (viewStart < favorites.length - cardQty) {
      setViewStart(viewStart + 1);
    }
  };

  const addOutfit = (e) => {
    e.preventDefault();
    const currentWPic = {
      id: current.id,
      name: current.name,
      category: current.category,
      default_price: current.default_price,
      pic: currentStyles[0].photos[0].thumbnail_url,
      stars,
    };
    let dupCheck = false;
    favorites.forEach((favorite) => {
      if (favorite.id === currentWPic.id) {
        dupCheck = true;
      }
    });
    if (dupCheck === false) {
      const newFavorites = [...favorites];
      newFavorites.push(currentWPic);
      setFavorites(newFavorites);
    }
  };

  return (
    <div className={local.carousel}>
      <button type="button" onClick={addOutfit} className={darkMode ? local.addCardDark : local.addCard}>
        <div className={local.hangerPic} />
        <div className={local.addWords}>
          <h4>
            Add&nbsp;
            {current.name}
            &nbsp;To Outfit
          </h4>
        </div>
      </button>

      {viewStart > 0 && (
        <div
          className={local.prevCard}
        >
          <div
            role="button"
            tabIndex={0}
            onClick={preClick}
            onKeyPress={buildHandleEnterKeyPress(preClick)}
          >
            &lt;
          </div>
        </div>
      )}

      {cardQty > 0 && favorites.slice(viewStart, viewEnd).map((favorite, i) => (
        <OutfitCard
          key={`${current.id + favorite + i}`}
          favorite={favorite}
          favorites={favorites}
          setFavorites={setFavorites}
          darkMode={darkMode}
        />
      ))}

      {viewEnd < favorites.length && favorites.length > cardQty && (
        <div className={local.nextCard}>
          <div
            role="button"
            tabIndex={0}
            onClick={nextClick}
            onKeyPress={buildHandleEnterKeyPress(nextClick)}
          >
            &gt;
          </div>
        </div>
      )}
    </div>
  );
};

export default OutfitList;
