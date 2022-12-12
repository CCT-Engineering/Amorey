import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import OutfitCard from './OutfitCard.jsx';
import requests from '../../requests.js';

const OutfitList = ({ favorites, setFavorites, current, currentStyles, stars }) => {
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
        // console.log('>4 length', build.length)
        const overflow = build.length - 4;
        // console.log('overflow', overflow)
        const calcStart = Math.floor(overflow / 2);
        // console.log('calcStart', calcStart)
        setViewStart(calcStart);
        // console.log('start', viewStart)
        setViewEnd(calcStart + 4);
        // console.log('end', viewEnd)
        setView(build.slice(calcStart, calcStart + 4));
        // console.log('view', view)
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
    // const currentWPic = current
    // currentWPic.pic = currentStyles[0].photos[0].thumbnail_url;
    const currentWPic = {
      id: current.id,
      name: current.name,
      category: current.category,
      default_price: current.default_price,
      pic: currentStyles[0].photos[0].thumbnail_url,
      stars,
    };
    // console.log('current', current);
    let dupCheck = false;
    favorites.forEach((favorite) => {
      if (favorite.id === currentWPic.id) {
        dupCheck = true;
        // console.log('was dup');
      }
    });
    if (dupCheck === false) {
      copy.push(currentWPic);
      setFavorites(copy);
    }
  };
    // if (favorites.includes(currentWPic)) {
    //   console.log('already got dup')
    // } else {
    //   copy.push(currentWPic);
    //   setFavorites(copy);
    // }
    // console.log('current', current)
    // console.log('favs', favorites)

  const preClick = (event) => {
    event.preventDefault();
    const copyStart = viewStart;
    const copyEnd = viewEnd;
    let copyArr = favorites;
    setViewStart(copyStart - 1);
    setViewEnd(copyEnd - 1);
    setView(copyArr.slice(copyStart - 1, copyEnd - 1));
    // console.log('new start', copyStart - 1)
    // console.log('new end', copyEnd - 1)
  };
  const nextClick = (event) => {
    event.preventDefault();

    const copyStart = viewStart;
    const copyEnd = viewEnd;
    let copyArr = favorites;
    setViewStart(copyStart + 1);
    setViewEnd(copyEnd + 1);
    setView(copyArr.slice(copyStart + 1, copyEnd + 1));
    // console.log('new start', copyStart + 1)
    // console.log('new end', copyEnd + 1)
  };

  return (
    <div className={local.carousel}>
      <div className={local.outfit}>
      <button onClick={addOutfit} className={local.addCard}>+ Add Current To Outfit</button>
      {/* <div onClick={addOutfit} className={local.addCard}>
        <div>+</div>
        <div>Add Current To Outfit</div>
      </div> */}
      <div className={local.prevOut} onClick={(e)=>{preClick(e)}}>
        {viewStart === 0 ? <div></div> : <div>&lt;</div>}
      </div>
      <div className={local.nextOut} onClick={(e)=>{nextClick(e)}}>
        {viewEnd === favorites.length ? <div></div> : <div>&gt;</div>}
      </div>
      {
        view.map((outfitPiece, index)=>
        // favorites.map((outfitPiece, index)=>
              <OutfitCard key={index.toString()} outfitPiece={outfitPiece} index={index} favorites={favorites} setFavorites={setFavorites} stars={stars} view={view} />
        )
      }
      </div>
    </div>

  );
};

export default OutfitList;
