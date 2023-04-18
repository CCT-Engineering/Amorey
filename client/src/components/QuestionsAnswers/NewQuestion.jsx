import React, { useState } from 'react';
import Thumbnail from '../SharedComponents/Thumbnail.jsx';
import requests from '../../requests.js';
import global from '../../styles/global.css';
import local from '../../styles/QuestionsAnswers/NewQuestion.css';

const NewQuestion = ({
  current, getReviews, showModal, darkMode,
}) => {
  const [summary, setSummary] = useState('');
  const [photos, setPhotos] = useState([]);
  const [letterCount, setLetterCount] = useState(50);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
    setBody(input);
  };

  const numberOfPhotos = () => {
    setPhotos([]);
    const { files } = event.target;
    if (files.length < 6) {
      const photoArray = [];
      for (let i = 0; i < files.length; i += 1) {
        photoArray.push(URL.createObjectURL(files[i]));
      }
      setPhotos(photoArray);
    } else {
      alert('Please limit photo uploads to 5 or less');
    }
    document.getElementById('uploadPhoto').val = null;
  };

  const collectFormData = () => {
    event.preventDefault();
    if (rating) {
      const newReview = {
        product_id: current.id,
        summary,
        name,
        photos,
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
          <Photos numberOfPhotos={numberOfPhotos} darkMode={darkMode} />
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

export default NewQuestion;
