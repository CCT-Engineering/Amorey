import React, { useState, useEffect } from 'react';
import local from '../../styles/RelatedOutfit.css';
import requests from '../../requests.js';
import CompareTable from './CompareTable.jsx';

const RelatedCard = ({ relateOneId, current }) => {
  const [info, setInfo] = useState({});
  const [style, setStyle] = useState({});
  const [pic, setPic] = useState(null);
  const [price, setPrice] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [rating, setRating] = useState(null);
  const [toggleTable, setToggleTable] = useState(false);

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
    }
  }, [relateOneId]);
  const handleToggle = () => {
    setToggleTable(!toggleTable);
  };
  return (
    <div className={local.relatedCard}>
      <div>-----Related Card -----</div>
      <div>click nav to detailed product page somehow</div>
      <img src={pic} width="175" height="192"></img>
      {/* <img src={pic} alt="card pic" className={local.cardpic}></img> */}
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
      <button type="button" onClick={handleToggle}>Compare w/Current Table</button>
      {/* <div className="popup" onClick={()=>{return(<div>Show something</div>)}}>Click Me!
      <span className="popupText">popupText</span>
      </div> */}
      {toggleTable ? (
        <CompareTable handleToggle={handleToggle} current={current} info={info} style={style} />
      ) : <div></div>}
      {/* <CompareTable/> */}
    </div>
  );
};

export default RelatedCard;
