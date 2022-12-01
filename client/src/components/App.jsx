import React, {useState} from 'react';
import Overview from './Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx'

const App = () => {
  //hooks

  //functions

  return (
    <div>
      <h1>Atelier</h1>
      <Overview/>
      <RelatedProducts/>
      <div style={{backgroundColor: 'BlanchedAlmond'}}>
        <RatingsReviews/>
      </div>
    </div>
  );
}

export default App;