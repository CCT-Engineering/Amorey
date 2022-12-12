import React from 'react';

const Summary = ({ updateInput, setSummary }) => (
  <h6>
    <input
      placeholder="Example: Best purchase ever!"
      size="30"
      onChange={() => updateInput(setSummary, event.target.value)}
    />
    {' Summary (Optional)'}
  </h6>
);

export default Summary;
