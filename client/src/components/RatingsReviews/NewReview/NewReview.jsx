import React, { useState } from 'react';
import Rating from './Rating.jsx';
import Recommend from './Recommend.jsx';
import Characteristic from './Characteristic.jsx';
import Summary from './Summary.jsx';
import Body from './Body.jsx';
import Username from './Username.jsx';
import Email from './Email.jsx';
import Photos from './Photos.jsx';
import Thumbnail from '../../SharedComponents/Thumbnail.jsx';
import requests from '../../../requests.js';
import global from '../../../styles/global.css';
import local from '../../../styles/RatingsReviews/NewReview/NewReview.css';

const NewReview = ({
  current, traits, getReviews, showModal, darkMode,
}) => {
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photos, setPhotos] = useState([]);
  const [characteristics, setCharacteristics] = useState({});
  const [letterCount, setLetterCount] = useState(50);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
    setBody(input);
  };

  const collectFormData = () => {
    event.preventDefault();
    if (rating) {
      const newReview = {
        product_id: current.id,
        rating,
        summary,
        body,
        recommend,
        name,
        email,
        photos,
        characteristics,
      };
      console.log(newReview);
      showModal(false);
      requests.postReview(newReview, () => {
        getReviews('newest');
      });
    } else {
      alert('Please enter a rating for the current product');
    }
  };

  const updateCharacteristic = (key, value) => {
    const temp = characteristics;
    const { id } = traits[key];
    temp[id] = value;
    setCharacteristics(temp);
  };

  const updateInput = (setState, value) => {
    setState(value);
  };

  return (
    <div className={global.modalBackground}>
      <div className={darkMode ? global.modalBodyDark : global.modalBody}>
        <form id="newReview" onSubmit={collectFormData}>
          <div className={global.modalLogo} aria-label="Form Logo" role="img" alt="AMOREY" />
          <h3 className={local.header}>
            {'Write Your Review About: '}
            <div className={darkMode ? local.productDark : local.product}>{current.name}</div>
          </h3>
          <Rating setRating={setRating} darkMode={darkMode} />
          <Recommend updateInput={updateInput} setRecommend={setRecommend} />
          {traits && (
            Object.keys(traits).map((trait, index) => {
              return <Characteristic trait={trait} key={`${trait + index}`} update={updateCharacteristic} darkMode={darkMode} />;
            })
          )}
          <Summary updateInput={updateInput} setSummary={setSummary} />
          <Body letterCount={letterCount} updateLetterCount={updateLetterCount} />
          <Username updateInput={updateInput} setName={setName} />
          <Email updateInput={updateInput} setEmail={setEmail} />
          <Photos setPhotos={setPhotos} darkMode={darkMode} />
          <div className={local.thumbnails}>{photos.map((photo, index) => <Thumbnail photo={photo} key={`${photo + index}`} />)}</div>
          <div>
            <button className={local.submit} aria-label="Submit Review" type="submit">Submit Review!</button>
            <button className={local.cancel} aria-label="Cancel Review" type="button" onClick={() => showModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReview;
