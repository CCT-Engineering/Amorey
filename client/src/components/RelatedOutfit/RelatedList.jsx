/* eslint-disable react/no-array-index-key */
import React, { useState, memo, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedCard from './RelatedCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const RelatedList = ({
  current, curMeta, calculateAverageStars, darkMode, relateArr, carouselWidth,
}) => {
  const [viewStart, setViewStart] = useState(0);

  const CARD_WIDTH = 240; // must be manually set
  const cardQty = carouselWidth > 0 ? Math.floor(carouselWidth / CARD_WIDTH) : 0;

  // Note: viewEnd below is exclusive
  const viewEnd = viewStart + cardQty > relateArr.length
    ? relateArr.length
    : viewStart + cardQty;
  // NEXT TASK: IF AT END OF CARD LIST AND ONE IS ADDED, WE WANT TO EXTEND THE BEGINNING

  const preClick = (e) => {
    e.preventDefault();
    if (viewStart === 0) {
      return;
    }
    const newViewStart = viewStart - 1;
    setViewStart(newViewStart);
  };

  const nextClick = (e) => {
    e.preventDefault();
    if (viewStart < relateArr.length - cardQty) {
      setViewStart(viewStart + 1);
    }
  };

  useEffect(() => {
    setViewStart(0);
  }, [current]);

  return (
    <div className={local.carousel}>
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

      {cardQty > 0 && relateArr.slice(viewStart, viewEnd).map((relateOneId) => (
        <MemoizedRelatedCard
          key={relateOneId}
          current={current}
          relateOneId={relateOneId}
          curMeta={curMeta}
          calculateAverageStars={calculateAverageStars}
          darkMode={darkMode}
        />
      ))}

      {viewEnd < relateArr.length && relateArr.length > cardQty && (
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

const MemoizedRelatedCard = memo(
  RelatedCard,
  (prevProps, nextProps) => (
    Object.entries(prevProps).every(([k, v]) => v == nextProps[k])
  )
);

export default RelatedList;
