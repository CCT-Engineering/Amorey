import React from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const Index = ({
  current, setCurrent, setFavorites, favorites, CurMeta,
  currentStyles, stars, setCurStars, calculateAverageStars, setMetadata, darkMode,
  setCurrentStyles, relateArr,
}) => {
  return (
    <div className={local.RelatedOutfit}>
      <h5>RELATED PRODUCTS</h5>
      <RelatedList
        currentId={current?.id}
        current={current}
        setCurrent={setCurrent}
        CurMeta={CurMeta}
        setCurStars={setCurStars}
        calculateAverageStars={calculateAverageStars}
        setMetadata={setMetadata}
        darkMode={darkMode}
        setCurrentStyles={setCurrentStyles}
        relateArr={relateArr}
      />
      <h5>YOUR OUTFIT</h5>
      <OutfitList
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        currentStyles={currentStyles}
        stars={stars}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Index;
