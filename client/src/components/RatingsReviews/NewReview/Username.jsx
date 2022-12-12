import React from 'react';
import local from '../../../styles/RatingsReviews/NewReview/Username.css';

const Username = ({ updateInput, setName }) => (
  <>
    <h6>
      <input
        className={local.username}
        placeholder="Example: Jackson11!"
        size="30"
        maxLength="60"
        onChange={() => updateInput(setName, event.target.value)}
        required
      />
      {' Username'}
    </h6>
    <p className={local.usernamePrompt}>
      For privacy reasons, do not use your full name or email address
    </p>
  </>
);

export default Username;
