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
    // console.log('changing current')
    setCurrent(info);
    setMetadata(rel1Meta);
  };;

  const favButton = <button type="button" className={local.action} onClick={handleToggle}>☆</button>

  return (
    <div className={local.relatedCard}>
      <div className={local.hoverMe}>
        <div className={local.picContainer}>
          {pic
            ? <Img src={pic} w={211} h={221} alt="card pic" onClick={handleChangeCurrent} className={local.pic}/>
            : (
              <div className={local.noPhoto} onClick={handleChangeCurrent}>
                Photo Unavailable
              </div>
            )}
        </div>
        {favButton}
        <div className={local.category}>
          {info.category}
        </div>
        <h4 className={local.name}>
          {info.name}
        </h4>
        <div className={local.price}>
          $
          {price}
        </div>
        <StarDisplay stars={relStar} className={local.star}/>
      </div>
      <div>
        {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} rel1Info={info} rel1style={style} CurMeta={CurMeta} rel1Meta={rel1Meta} />
      ) : <div></div>}
      </div>
    </div>
  );
};

export default RelatedCard;
