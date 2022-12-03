import React, {useState} from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import testData from '../testData.jsx';

const App = () => {
  //hooks

  //functions

  return (
    <div>
      <h1>Atelier</h1>
      <Overview/>
      <RelatedOutfit/>
      <div style={{backgroundColor: 'BlanchedAlmond'}}>
        <RatingsReviews/>
      </div>
    </div>
  );
}

export default App;