import React, { useState } from 'react';
import StarRating from './StarRating.jsx';
import Characteristic from './Characteristic.jsx';
import Photos from '../Images/Photos.jsx';
import requests from '../../../requests.js';
// import emailVerification from '../../../util/emailVerification.js';
import local from '../../../styles/RatingsReviews/NewReview/NewReview.css';

const NewReview = ({
  current, traits, getReviews, showModal,
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

  const numberOfPhotos = () => {
    const { files } = event.target;
    if (files.length > 5) {
      document.getElementById('uploadPhoto').value = [];
      alert('Maximum of 5 photo uploads is allowed');
    } else {
      const photoArray = [];
      for (let i = 0; i < files.length; i += 1) {
        photoArray.push(URL.createObjectURL(files[i]));
      }
      setPhotos(photoArray);
    }
  };

  const updateCharacteristic = (key, value) => {
    const temp = characteristics;
    const { id } = traits[key];
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
    console.log(newReview);
    requests.postReview(newReview, () => {
      console.log('REVIEW SUCCESSFULLY SUBMITTED');
      getReviews('newest');
    });
  };

  const updateInput = (setState, value) => {
    setState(value);
  };

  return (
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" onSubmit={collectFormData}>
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
          {traits && (
            Object.keys(traits).map((trait, index) => {
              return <Characteristic trait={trait} key={`${trait + index}`} update={updateCharacteristic} />;
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
          <p className={local.bodyPrompt}>{letterCount > 0 ? `Minimum required characters left: [${letterCount}]` : 'Minimum reached'}</p>
          <h6>
            <input
              className={local.username}
              placeholder="Example: Jackson11!"
              maxLength="60"
              onChange={() => updateInput(setName, event.target.value)}
              required
            />
            {' Username'}
          </h6>
          <p className={local.usernamePrompt}>
            For privacy reasons, do not use your full name or email address
          </p>
          <h6>
            <input
              className={local.email}
              type="email"
              placeholder="jackson11@email.com"
              maxLength="60"
              pattern="(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])"
              onChange={() => updateInput(setEmail, event.target.value)}
              required
            />
            {' Email Address'}
          </h6>
          <p className={local.emailPrompt}>For authentication reasons, you will not be emailed</p>
          <label htmlFor="photos">
            Upload Images (Optional)
            <input
              className={local.uploadPhoto}
              id="uploadPhoto"
              type="file"
              accept="image/*"
              onChange={numberOfPhotos}
              multiple
            />
          </label>
          {photos.map((photo, index) => <Photos photo={photo} key={`${photo + index}`} />)}
          <div>
            <button className={local.submit} type="submit">Submit Review!</button>
            <button className={local.cancel} type="button" onClick={() => showModal(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewReview;
