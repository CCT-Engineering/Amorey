import React, { useState, useRef } from 'react';
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
  const uploadPhoto = useRef();

  const updateLetterCount = (input) => {
    setLetterCount(50 - input.length);
    setBody(input);
  };

  const numberOfPhotos = () => {
    const { files } = event.target;
    if (files.length > 5) {
      uploadPhoto.current.value = [];
    } else {
      const photoArray = [];
      for (let i = 0; i < files.length; i += 1) {
        photoArray.push(URL.createObjectURL(files[i]));
      }
      setPhotos(photoArray);
    }
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
      showModal(false);
      requests.postReview(newReview, () => {
        getReviews('newest');
      });
    } else {
      // alert('Please enter a rating for the current product');
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
    <div className={local.modal}>
      <div className={local.reviewForm}>
        <form id="newReview" onSubmit={collectFormData}>
          <h2>Write Your Review</h2>
          <h4>{`About the ${current.name}`}</h4>
          <Rating setRating={setRating} />
          <Recommend updateInput={updateInput} setRecommend={setRecommend} />
          {traits && (
            Object.keys(traits).map((trait, index) => {
              return <Characteristic trait={trait} key={`${trait + index}`} update={updateCharacteristic} />;
            })
          )}
          <Summary updateInput={updateInput} setSummary={setSummary} />
          <Body letterCount={letterCount} updateLetterCount={updateLetterCount} />
          <Username updateInput={updateInput} setName={setName} />
          <Email updateInput={updateInput} setEmail={setEmail} />
          <Photos numberOfPhotos={numberOfPhotos} uploadPhoto={uploadPhoto} />
          <div className={local.thumbnails}>{photos.map((photo, index) => <Thumbnail photo={photo} key={`${photo + index}`} />)}</div>
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
