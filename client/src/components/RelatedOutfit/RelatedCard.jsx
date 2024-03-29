import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import Img from '../SharedComponents/Img.jsx';

const RelatedCard = ({
  relateOneId, current, CurMeta, setCurrent, setCurStars, calculateAverageStars, setMetadata,
  darkMode, setCurrentStyles, setCards,
}) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [relStar, setRelStar] = useState(5);

  useEffect(() => {
    if (relateOneId) {
      requests.getProductInfo(relateOneId, (infoData) => {
        setInfo(infoData);
      });
      requests.getStyles(relateOneId, ({ results }) => {
        setStyle(results);
      });
      requests.getMetadata(relateOneId, (metaData) => {
        setRelStar(calculateAverageStars(metaData.ratings));
        setRel1Meta(metaData);
      });
    }
  }, []);

  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };

  const handleChangeCurrent = (e) => {
    e.preventDefault();
    setCurrent(info);
    setMetadata(rel1Meta);
    setCurrentStyles(style);
    setCurStars(relStar);
    setCards({
      0: null, 1: null, 2: null, 3: null, 4: null,
    });
  };

  const favButton = <button type="button" className={local.action} onClick={handleToggle}>☆</button>;
  return (
    <>
      <div className={`related-card ${darkMode ? local.relatedCardDark : local.relatedCard}`}>
        <div className={darkMode ? local.picContainerDark : local.picContainer} role="button">
          {style[0]?.photos[0]?.thumbnail_url
            ? <Img src={style[0].photos[0].thumbnail_url} w={211} h={221} alt="card pic" onClick={handleChangeCurrent} className={local.pic} />
            : (
              <div
                role="button"
                tabIndex={0}
                className={local.noPhoto}
                onClick={handleChangeCurrent}
                onKeyPress={buildHandleEnterKeyPress(handleChangeCurrent)}
              >
                Photo Unavailable
              </div>
            )}
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
      <div>
        <CompareTable
          style={{ display: toggleTable ? 'block' : 'none' }}
          handleToggle={handleToggle}
          toggleTable={toggleTable}
          current={current}
          rel1Info={info}
          CurMeta={CurMeta}
          rel1Meta={rel1Meta}
          darkMode={darkMode}
        />
      </div>
    </>
  );
};

export default RelatedCard;
