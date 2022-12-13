import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Index = ({ current, setCurrent, setFavorites, favorites, CurMeta, currentStyles, stars, setStars, calculateAverageStars, setMetadata }) => {

  return (
    <div className={local.RelatedOutfit}>
      <h5>RELATED PRODUCTS</h5>
      <RelatedList currentId={current?.id} current={current} setCurrent={setCurrent} CurMeta={CurMeta} setStars={setStars} calculateAverageStars={calculateAverageStars} setMetadata={setMetadata} />
      <h5>YOUR OUTFIT</h5>
      {currentStyles.length && (
      <OutfitList current={current} favorites={favorites} setFavorites={setFavorites} currentStyles={currentStyles} stars={stars} />
      )}
    </div>

  );
};

export default Index;
