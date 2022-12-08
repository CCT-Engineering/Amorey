import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';

const RelatedCard = ({ relateOneId, current, CurMeta, setCurrent }) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);
  const [onSale, setOnSale] = useState(false);

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
        // console.log('related meta', metaData);
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
  };
  return (
    <div className={local.relatedCard}>
      <button type="button" onClick={handleToggle} className={local.action}>☆</button>
      <center>
        <img src={pic} alt="card pic" className={local.cardpic}onClick={handleChangeCurrent}></img>
      </center>
      <div>
        Category:
        {info.category}
      </div>
      <div>
        Name:
        {info.name}
      </div>
      <div>
        Price: $
        {price}
      </div>
      <div>Star Rating: get from Thomas state</div>
      {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} rel1Info={info} rel1style={style} CurMeta={CurMeta} rel1Meta={rel1Meta} />
      ) : <div></div>}
    </div>
  );
};

export default RelatedCard;
