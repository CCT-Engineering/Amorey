import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const OutfitList = ({
  favorites, setFavorites, current, currentStyles, stars, darkMode, carouselWidth,
}) => {
  const [view, setView] = useState([]);
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);

  useEffect(() => {
    if (favorites) {
      const build = [];
      favorites.forEach((part) => {
        build.push(part);
      });
      if (build.length > 4) {
        const overflow = build.length - 4;
        const calcStart = Math.floor(overflow / 2);
        setViewStart(calcStart);
        setViewEnd(calcStart + 4);
        setView(build.slice(calcStart, calcStart + 4));
      } else {
        setView(build);
        setViewStart(0);
        setViewEnd(build.length);
      }
    }
  }, [favorites]);

  const addOutfit = () => {
    event.preventDefault();
    const copy = favorites.slice();
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
      copy.push(currentWPic);
      setFavorites(copy);
    }
  };
  const preClick = (event) => {
    event.preventDefault();
    setViewStart(viewStart - 1);
    setViewEnd(viewEnd - 1);
    setView(favorites.slice(viewStart - 1, viewEnd - 1));
  };
  const nextClick = (event) => {
    event.preventDefault();
    setViewStart(viewStart + 1);
    setViewEnd(viewEnd + 1);
    setView(favorites.slice(viewStart + 1, viewEnd + 1));
  };

  return (
    <div className={local.carousel}>
      <div className={local.outfit}>
        <button type="button" onClick={addOutfit} className={darkMode ? local.addCardDark : local.addCard}>
          <div className={local.hangerPic} />
          <div className={local.addWords}>
            <h4>
              Add
              {current.name}
              To Outfit
            </h4>
          </div>
        </button>
        <div
          role="button"
          tabIndex={0}
          className={local.prevCard}
          onClick={(e) => preClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewStart === 0 ? null : <div>&lt;</div>}
        </div>
        <div
          role="button"
          tabIndex={0}
          className={local.nextCard}
          onClick={(e) => nextClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewEnd === favorites.length ? null : <div>&gt;</div>}
        </div>
        {
          view.map((outfitPiece, index) => (
            <OutfitCard
              key={`${current.id + outfitPiece + index}`}
              outfitPiece={outfitPiece}
              index={index}
              favorites={favorites}
              setFavorites={setFavorites}
              view={view}
              darkMode={darkMode}
            />
          ))
        }
      </div>
    </div>
  );
};

export default OutfitList;
