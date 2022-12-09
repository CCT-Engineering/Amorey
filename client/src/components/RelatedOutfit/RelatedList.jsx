import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import RelatedCard from './RelatedCard.jsx';
import requests from '../../requests.js';
// import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const RelatedList = ({ currentId, current, CurMeta, setCurrent, setStars, calculateAverageStars, setMetadata }) => {
  const [relateArr, setRelatedArr] = useState([]);

  useEffect(() => {
    if (currentId) {
      requests.getRelated(currentId, (data) => {
        setRelatedArr(data);
      });
    }
  }, [currentId]);
  const preClick = (event) => {
    event.preventDefault();
    console.log('previous');
  };
  const nextClick = (event) => {
    event.preventDefault();
    console.log('next');
  };
  return (
    <div className={local.carousel}>
      <div className={local.related}>
        <div className={local.prev} onClick={(e)=>{preClick(e)}}>&lt;</div>
        <div className={local.next} onClick={(e)=>{nextClick(e)}}>&gt;</div>
        {/* <div className={local.prev}>Previous</div>
        <div className={local.next}>Next</div> */}
        {relateArr.map((relateOneId, index) =>
          <RelatedCard key={index.toString()} relateOneId={relateOneId} current={current} CurMeta={CurMeta} setCurrent={setCurrent} setStars={setStars} calculateAverageStars={calculateAverageStars} setMetadata={setMetadata}/>)}
      </div>
    </div>
  );
};

export default RelatedList;
