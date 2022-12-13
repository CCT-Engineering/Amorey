import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedCard from './RelatedCard.jsx';
import requests from '../../requests.js';
// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const RelatedList = ({ currentId, current, CurMeta, setCurrent, setStars, calculateAverageStars, setMetadata }) => {
  const [relateArr, setRelatedArr] = useState([]);
  const [view, setView] = useState([]);
  const [viewStart, setViewStart] = useState(0);
  const [viewEnd, setViewEnd] = useState(0);

//if start === 0 hide arrow
//if end === relatedArr.length hide arrow

  useEffect(() => {
    if (currentId) {
      requests.getRelated(currentId, (data) => {
        setRelatedArr(data);
        if (data.length > 5) {
          // console.log('>5 length', data.length)
          const overflow = data.length - 5;
          // console.log('overflow', overflow)
          const calcStart = Math.floor(overflow / 2);
          // console.log('calcStart', calcStart)
          setViewStart(calcStart);
          // console.log('start', viewStart)
          setViewEnd(calcStart + 5);
          // console.log('end', viewEnd)
          setView(data.slice(calcStart, calcStart + 5));
          // console.log('view', view)
        } else {
          setView(data);
          setViewStart(0);
          setViewEnd(data.length);
        }
      });
    }
  }, [currentId]);

  const preClick = (event) => {
    event.preventDefault();

    setViewStart(viewStart - 1);
    setViewEnd(viewEnd - 1);
    setView(relateArr.slice(viewStart - 1, viewEnd - 1));
    // console.log('new start', copyStart - 1)
    // console.log('new end', copyEnd - 1)
  };
  const nextClick = (event) => {
    event.preventDefault();
    setViewStart(viewStart + 1);
    setViewEnd(viewEnd + 1);
    setView(relateArr.slice(viewStart + 1, viewEnd + 1));
    // console.log('new start', copyStart + 1)
    // console.log('new end', copyEnd + 1)
  };

  return (
    <div className={local.carousel}>
      <div className={local.related}>
        <div className={local.prevRel} onClick={(e)=>{preClick(e)}}>
          {viewStart === 0 ? <div></div> : <div>&lt;</div>}
          {/* {viewStart === 0 ? <div></div> : <div>I can see you hiding behind there!!! come out!!!</div>} */}
        </div>

        <div className={local.nextRel} onClick={(e)=>{nextClick(e)}}>
        {viewEnd === relateArr.length ? <div></div> : <div>&gt;</div>}
          </div>
        {view.map((relateOneId, index) =>
          <RelatedCard key={index.toString()} relateOneId={relateOneId} current={current} CurMeta={CurMeta} setCurrent={setCurrent} setStars={setStars} calculateAverageStars={calculateAverageStars} setMetadata={setMetadata}/>)}
      </div>
    </div>
  );
};

export default RelatedList;
