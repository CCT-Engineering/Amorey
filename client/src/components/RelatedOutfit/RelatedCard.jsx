import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';

const RelatedCard = ({ relateOneId, current, CurMeta }) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);
  const [rel1Meta, setRel1Meta] = useState(0);

  useEffect(() => {
    if (relateOneId) {
      requests.getProductInfo(relateOneId, (infoData) => {
        // console.log('infoData from rel 1 Id', infoData);
        setInfo(infoData);
      });
      requests.getStyles(relateOneId, (styleData) => {
        // console.log('styleData from rel 1 Id', styleData);
        setStyle(styleData);
        // console.log('pic?', styleData.results[0].photos[0].thumbnail_url);
        setPic(styleData.results[0].photos[0].thumbnail_url);
        // console.log('discount example all null', styleData.results[0].sale_price);
        setDiscount(styleData.results[0].sale_price);
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
  return (
    <div className={local.relatedCard}>
      {/* <div onClick={handleToggle} className={local.action}>☆</div> */}
      <button type="button" onClick={handleToggle} className={local.action}>☆</button>
      {/* <div>-----Related Card -----</div>
      <div>click nav to detailed product page somehow</div> */}
      <center>
        <img src={pic} alt="card pic" className={local.cardpic}></img>
      </center>
      <div>
        category:
        {info.category}
      </div>
      <div>
        name:
        {info.name}
      </div>
      <div>
        price:
        {info.default_price}
      </div>
      <div>Star Rating: get from Thomas state</div>
      {/* <div className="popup" onClick={()=>{return(<div>Show something</div>)}}>Click Me!
      <span className="popupText">popupText</span>
      </div> */}
      {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} rel1Info={info} rel1style={style} CurMeta={CurMeta} rel1Meta={rel1Meta} />
      ) : <div></div>}
      {/* <CompareTable/> */}
    </div>
  );
};

export default RelatedCard;
