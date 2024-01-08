import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import Img from '../SharedComponents/Img.jsx';

const RelatedCard = ({
  relateOneId, current, curMeta, calculateAverageStars, darkMode,
}) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [relStar, setRelStar] = useState(5);

  useEffect(() => {
    async function fetchData() {
      setInfo(await requests.getProductInfo(relateOneId));
      requests.getStyles(relateOneId, ({ results }) => {
        setStyle(results);
      });
      requests.getMetadata(relateOneId, (metaData) => {
        setRelStar(calculateAverageStars(metaData.ratings));
        setRel1Meta(metaData);
      });
    }
    if (relateOneId) {
      fetchData();
    }
  }, []);

  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };

  const favButton = <button type="button" className={local.action} onClick={handleToggle}>☆</button>;
  return (
    <div className="card-container">
      <div className={`related-card ${darkMode ? local.relatedCardDark : local.relatedCard}`}>
        <div className={darkMode ? local.picContainerDark : local.picContainer} role="button">
          <Link to={`/products/${info.id}`}>
            {style[0]?.photos[0]?.thumbnail_url
              ? <Img src={style[0].photos[0].thumbnail_url} w={211} h={221} alt="card pic" className={local.pic} />
              : (
                <div
                  role="button"
                  tabIndex={0}
                  className={local.noPhoto}
                >
                  Photo Unavailable
                </div>
              )}
          </Link>
        </div>
        {favButton}
        <div className={local.category}>
          {info.category ? info.category : 'Category'}
        </div>
        <h4 className={local.name}>
          {info.name ? info.name : 'Name'}
        </h4>
        <div className={local.price}>
          $
          {style.length && style[0]?.sale_price ? style[0].sale_price : style[0]?.original_price}
        </div>
        <div className={local.starContainer}>
          {relStar
            ? <StarDisplay stars={relStar} className={local.star} darkMode={darkMode} />
            : null}
        </div>
      </div>
      <CompareTable
        style={{ display: toggleTable ? 'block' : 'none' }}
        handleToggle={handleToggle}
        toggleTable={toggleTable}
        current={current}
        rel1Info={info}
        curMeta={curMeta}
        rel1Meta={rel1Meta}
        darkMode={darkMode}
      />
    </div>
  );
};

export default RelatedCard;
