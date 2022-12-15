import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress } from '../../util';
import Img from '../SharedComponents/Img.jsx';

const RelatedCard = ({
  relateOneId, current, CurMeta, setCurrent, setCurStars, calculateAverageStars, setMetadata, darkMode, setCurrentStyles
}) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [relStar, setRelStar] = useState(5);

  useEffect(() => {
    if (relateOneId) {
      requests.getProductInfo(relateOneId, (infoData) => {
        setInfo(infoData);
      });
      requests.getStyles(relateOneId, ({ results }) => {
        setStyle(results);
        setPic(results[0].photos[0].thumbnail_url);
        const saleCheck = !!results[0].sale_price;
        setOnSale(saleCheck);
        setPrice(saleCheck ? results[0].sale_price : results[0].original_price);
      });
      requests.getMetadata(relateOneId, (metaData) => {
        setRelStar(calculateAverageStars(metaData.ratings));
        setRel1Meta(metaData);
      });
    }
  }, [relateOneId]);
  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };
  const handleChangeCurrent = () => {
    console.log(style);
    event.preventDefault();
    setCurrent(info);
    setMetadata(rel1Meta);
    setCurrentStyles(style);
    setCurStars(relStar);
  };

  const favButton = <button type="button" className={local.action} onClick={handleToggle}>☆</button>;
  return (
    <div className={darkMode ? local.relatedCardDark : local.relatedCard}>
      <div className={darkMode ? local.hoverMeDark : local.hoverMe}>
        <div className={darkMode ? local.picContainerDark : local.picContainer}>
          {pic
            ? <Img src={pic} w={211} h={221} alt="card pic" onClick={handleChangeCurrent} className={local.pic} />
            : (
              <div
                role="button"
                tabIndex={0}
                className={darkMode ? local.noPhotoDark : local.noPhoto}
                onClick={handleChangeCurrent}
                onKeyPress={buildHandleEnterKeyPress(handleChangeCurrent)}
              >
                Photo Unavailable
              </div>
            )}
        </div>
        {favButton}
        <div className={local.category}>
          {info.category ? info.category : null}
        </div>
        <h4 className={local.name}>
          {info.name ? info.name : null}
        </h4>
        <div className={local.price}>
          $
          {price ? price : null}
        </div>
        {relStar ? <StarDisplay stars={relStar} className={local.star} /> : null}
      </div>
      <div>
        {toggleTable ? (
          <CompareTable
            handleToggle={handleToggle}
            current={current}
            rel1Info={info}
            CurMeta={CurMeta}
            rel1Meta={rel1Meta}
            darkMode={darkMode}
          />
        ) : <div />}
      </div>
    </div>
  );
};

export default RelatedCard;
