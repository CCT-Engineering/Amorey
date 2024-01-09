import React, { useState, useEffect, useRef } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedList from './RelatedList.jsx';
import OutfitList from './OutfitList.jsx';

const containerIdStr = 'carousel-container';

const Index = ({
  current, setFavorites, favorites, curMeta,
  currentStyles, stars, calculateAverageStars, darkMode,
  relateArr,
}) => {
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === containerIdStr) {
          setCarouselWidth(entry.contentRect.width);
        }
      });
    });

    if (carouselRef.current) {
      resizeObserver.observe(carouselRef.current);
    }

    return () => {
      resizeObserver.unobserve(carouselRef.current);
    };
  }, []);

  return (
    <div className={local.relatedOutfit} ref={carouselRef} id={containerIdStr}>
      <h5 style={{ marginTop: '30px' }}>RELATED PRODUCTS</h5>
      <RelatedList
        current={current}
        curMeta={curMeta}
        calculateAverageStars={calculateAverageStars}
        darkMode={darkMode}
        relateArr={relateArr}
        carouselWidth={carouselWidth}
      />
      <h5 style={{ marginTop: '20px' }}>YOUR OUTFIT</h5>
      <OutfitList
        current={current}
        favorites={favorites}
        setFavorites={setFavorites}
        currentStyles={currentStyles}
        stars={stars}
        darkMode={darkMode}
        carouselWidth={carouselWidth}
      />
    </div>
  );
};

export default Index;
