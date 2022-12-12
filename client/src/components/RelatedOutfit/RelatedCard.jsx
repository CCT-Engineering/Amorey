import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';
import StarDisplay from '../SharedComponents/StarDisplay.jsx';
import { buildHandleEnterKeyPress, formatImg } from '../../util';
import Img from '../SharedComponents/Img.jsx';

const RelatedCard = ({ relateOneId, current, CurMeta, setCurrent, setStars, calculateAverageStars, setMetadata }) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [relStar, setRelStar] = useState(5);

//   const priceStyle = {
//     color: `${onSale ? 'red' : 'inherit'}`,
//   };
//   <h6>
//   <span style={priceStyle}>
//     $
//     {price}
//     &nbsp;
//   </span>
//   <span className={local.oldPrice}>{onSale ? `$${origPrice}` : ''}</span>
// </h6>

// .oldPrice {
//   text-decoration: line-through;
// }

  useEffect(() => {
    if (relateOneId) {
      requests.getProductInfo(relateOneId, (infoData) => {
        setInfo(infoData);
      });
      requests.getStyles(relateOneId, (styleData) => {
        setStyle(styleData);
        setPic(styleData.results[0].photos[0].thumbnail_url);
        // setDiscount(styleData.results[0].sale_price);
        const saleCheck = !!styleData.results[0].sale_price;
        // console.log('saleCheck', saleCheck);
        // console.log('sale price', styleData.results[0].sale_price);
        // console.log('styleData', styleData);
        setOnSale(saleCheck);
        setPrice(saleCheck ? styleData.results[0].sale_price : styleData.results[0].original_price);
      });
      requests.getMetadata(relateOneId, (metaData) => {
        setRelStar(calculateAverageStars(metaData.ratings))
        setRel1Meta(metaData);
      });
    }
  }, [relateOneId]);
  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };
  const handleChangeCurrent = () => {
    event.preventDefault();
    setCurrent(info);
    setMetadata(rel1Meta);
  };

  const favButton = <button type="button" className={local.action} onClick={handleToggle}>☆</button>

  return (
    <div className={local.relatedCard}>
      {pic ? favButton : ''}
      {/* <button type="button" className={local.action} onClick={handleToggle}>☆</button> */}
      <center>
        {pic
          ? <Img src={pic} w={175} h={192} alt="card pic" onClick={handleChangeCurrent} />
          : (
            <div className={local.noPhoto} onClick={handleChangeCurrent}>
              {favButton}
              Photo Unavailable
            </div>
          )}
      </center>
      <div>
        {/* Category: */}
        {info.category}
      </div>
      <div>
        {/* Name: */}
        {info.name}
      </div>
      <div>
        {/* Price: $ */}
        $
        {price}
      </div>
      <StarDisplay stars={relStar} />
      {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} rel1Info={info} rel1style={style} CurMeta={CurMeta} rel1Meta={rel1Meta} />
      ) : <div></div>}
    </div>
  );
};

export default RelatedCard;
