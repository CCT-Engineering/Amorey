import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import Characteristic from './Characteristic.jsx';
import requests from '../../../requests.js';
import local from '../../../styles/RatingsReviews/NewReview/Index.css';

const WriteNewReview = ({ current, details, renderReviews }) => {
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

  const numberOfPhotos = () => {
    if (event.target.files.length > 5) {
      document.getElementById('uploadPhoto').value = [];
      alert('Maximum of 5 photo uploads is allowed');
    } else {
      setPhotos(event.target.files);
    }
  };

  const updateCharacteristic = (key, value) => {
    const temp = characteristics;
    temp[key] = value;
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
      characteristics: {},
    };
    console.log(newReview);
    requests.postReview(newReview, () => {
      console.log("I DID IT!!!!");
      renderReviews();
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
          <label htmlFor="recYes">
            Yes
            <input
              type="radio"
              id="recYes"
              onChange={() => updateInput(setRecommend, true)}
              required
            />
          </label>
          <label htmlFor="recNo">
            No
            <input
              type="radio"
              id="recNo"
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
          <button type="submit">Submit Review!</button>
        </form>
      </div>
    </div>
  );
};

export default WriteNewReview;
