import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import Characteristic from './Characteristic.jsx';
import requests from '../../../requests.js';
import local from '../../../styles/RatingsReviews/NewReview/NewReview.css';

const NewReview = ({
  current, details, renderReviews, showModal,
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
  // const [showImgs, setShowImgs] = useState(false);

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
    setBody(input);
  };

  const numberOfPhotos = () => {
    if (event.target.files.length > 5) {
      document.getElementById('uploadPhoto').value = [];
      alert('Maximum of 5 photo uploads is allowed');
    } else {
      console.log(event.target.files);
      // setShowImgs(true);
      setPhotos(event.target.files);
    }
  };

  // function previewFile() {
  //   const preview = document.querySelector('img');
  //   const file = document.querySelector('input[type=file]').files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = function () {
  //     preview.src = reader.result;
  //   };
  //   if (file) {
  //     reader.readAsDataURL(file);
  //   } else {
  //     preview.src = '';
  //   }
  // }

  const updateCharacteristic = (key, value) => {
    const temp = characteristics;
    const { id } = details[key];
    temp[id] = value;
    setCharacteristics(temp);
  };

  const collectFormData = () => {
    event.preventDefault();
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
    showModal(false);
    requests.postReview(newReview, () => {
      console.log('REVIEW SUCCESSFULLY  SUBMITTED');
      renderReviews('newest');
    });
  };

  const updateInput = (setState, value) => {
    setState(value);
  };

  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" className="form" onSubmit={collectFormData}>
          <h2>Write Your Review</h2>
          <h4>{`About the ${current.name}`}</h4>
          <StarRating setRating={setRating} />
          <h6>Do You recommend this product?</h6>
          <label htmlFor="recommend">
            Yes
            <input
              type="radio"
              name="recommend"
              onChange={() => updateInput(setRecommend, true)}
              required
            />
          </label>
          <label htmlFor="recommend">
            No
            <input
              type="radio"
              name="recommend"
              onChange={() => updateInput(setRecommend, false)}
            />
          </label>
          {details && (
            Object.keys(details).map((detail, index) => {
              return <Characteristic detail={detail} key={`${detail + index}`} update={updateCharacteristic} />;
            })
          )}
          <h6>
            <input
              placeholder="Example: Best purchase ever!"
              onChange={() => updateInput(setSummary, event.target.value)}
            />
            {' Summary (Optional)'}
          </h6>
          <h6>
            <input
              placeholder="Why did you like the product or not?"
              minLength="50"
              maxLength="1000"
              onChange={() => updateLetterCount(event.target.value)}
              required
            />
            {' Body'}
          </h6>
          <p>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
          <h6>
            <input
              placeholder="Example: Jackson11!"
              maxLength="60"
              onChange={() => updateInput(setName, event.target.value)}
              required
            />
            {' Username'}
          </h6>
          <p>For privacy reasons, do not use your full name or email address</p>
          <h6>
            <input
              type="email"
              placeholder="jackson11@email.com"
              maxLength="60"
              // General Email Regex (RFC 5322 Official Standard)
              pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
              onChange={() => updateInput(setEmail, event.target.value)}
              required
            />
            {' Email Address'}
          </h6>
          <p>For authentication reasons, you will not be emailed</p>
          <label htmlFor="photos">
            Upload Images (Optional)
            <input
              id="uploadPhoto"
              type="file"
              accept="image/*"
              onChange={numberOfPhotos}
              multiple
            />
          </label>
          {/* {showImgs ? previewFile() : null} */}
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default NewReview;
