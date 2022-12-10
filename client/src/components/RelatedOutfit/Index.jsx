import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Index = ({ current, setCurrent, setFavorites, favorites, CurMeta, currentStyles, stars, setStars, calculateAverageStars, setMetadata }) => {

  return (
    <div className={local.RelatedOutfit}>
      <h4>RELATED PRODUCTS</h4>
      <RelatedList currentId={current?.id} current={current} setCurrent={setCurrent} CurMeta={CurMeta} setStars={setStars} calculateAverageStars={calculateAverageStars} setMetadata={setMetadata} />
      <h4>YOUR OUTFIT</h4>
      <OutfitList current={current} favorites={favorites} setFavorites={setFavorites} currentStyles={currentStyles} stars={stars} />
    </div>

  );
};

export default Index;
