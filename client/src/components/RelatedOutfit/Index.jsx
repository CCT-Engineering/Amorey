import React, { useState } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Index = ({ current, setFavorites, favorites }) => {
  return (
    <div className={local.RelatedOutfit}>
      <h4>RELATED PRODUCTS</h4>
      <RelatedList currentId={current.id} current={current} />
      <h4>YOUR OUTFIT</h4>
      <OutfitList current={current} favorites={favorites} setFavorites={setFavorites} />
    </div>

  );
};

export default Index;
