import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedCard from './RelatedCard.jsx';
import { buildHandleEnterKeyPress } from '../../util';

const RelatedList = ({
  currentId, current, CurMeta, setCurrent, setCurStars, calculateAverageStars, setMetadata, darkMode, setCurrentStyles, relateArr,
}) => {
  const [view, setView] = useState([]);
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);

  useEffect(() => {
    if (relateArr.length > 5) {
      const overflow = relateArr.length - 5;
      const calcStart = Math.floor(overflow / 2);
      setViewStart(calcStart);
      setViewEnd(calcStart + 5);
      setView(relateArr.slice(calcStart, calcStart + 5));
    } else {
      setView(relateArr);
      setViewStart(0);
      setViewEnd(relateArr.length);
    }
  }, [relateArr]);

  const preClick = (event) => {
    event.preventDefault();
    setViewStart(viewStart - 1);
    setViewEnd(viewEnd - 1);
    setView(relateArr.slice(viewStart - 1, viewEnd - 1));
  };
  const nextClick = (event) => {
    event.preventDefault();
    setViewStart(viewStart + 1);
    setViewEnd(viewEnd + 1);
    setView(relateArr.slice(viewStart + 1, viewEnd + 1));
  };
  return (
    <div className={local.carousel}>
      <div className={local.related}>
        <div
          role="button"
          tabIndex={0}
          className={local.prevRel}
          onClick={(e) => preClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewStart === 0 ? null : <div>&lt;</div>}
        </div>

        <div
          role="button"
          tabIndex={0}
          className={local.nextRel}
          onClick={(e) => nextClick(e)}
          onKeyPress={buildHandleEnterKeyPress((e) => preClick(e))}
        >
          {viewEnd === relateArr.length ? null : <div>&gt;</div>}
        </div>
        {view.map((relateOneId, index) => (
          <RelatedCard
            key={`${index + current.id}`}
            relateOneId={relateOneId}
            current={current}
            CurMeta={CurMeta}
            setCurrent={setCurrent}
            setCurStars={setCurStars}
            calculateAverageStars={calculateAverageStars}
            setMetadata={setMetadata}
            darkMode={darkMode}
            setCurrentStyles={setCurrentStyles}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedList;
