import React from 'react';

const Recommend = ({ updateInput, setRecommend }) => (
  <>
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
  </>
);

export default Recommend;
