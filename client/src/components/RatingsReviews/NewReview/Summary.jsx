import React from 'react';

const Summary = ({ updateInput, setSummary }) => (
  <h6>
    <input
      placeholder="Example: Best purchase ever!"
      onChange={() => updateInput(setSummary, event.target.value)}
    />
    {' Summary (Optional)'}
  </h6>
);

export default Summary;
