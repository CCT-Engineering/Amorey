import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Index = ({ current, setCurrent, setFavorites, favorites, CurMeta, currentStyles }) => {
//   console.log('cur styles', currentStyles)
// console.log('cur styles 0', currentStyles[0])
// console.log('cur styles photos', currentStyles[0].photos)
// console.log('cur styles photos 0', currentStyles[0].photos[0])
// console.log('cur styles photos 0', currentStyles[0].photos[0].thumbnail_url)
  return (
    <div className={local.RelatedOutfit}>
      <h4>RELATED PRODUCTS</h4>
      <RelatedList currentId={current?.id} current={current} setCurrent={setCurrent} CurMeta={CurMeta} />
      <h4>YOUR OUTFIT</h4>
      <OutfitList current={current} favorites={favorites} setFavorites={setFavorites} />
    </div>

  );
};

export default Index;
