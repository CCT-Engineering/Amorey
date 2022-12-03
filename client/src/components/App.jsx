import React, {useState, useEffect} from 'react';
import requests from '../requests.js';
import Overview from './Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';

const App = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState({});
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    requests.getProducts((data) => {
      setProducts(data);
      setCurrent(data[0]);
      requests.getMetadata(data[0].id, (data) => {
        setMetadata(data);
      });
    });
  }, []);

  // console.log(products);
  // console.log(current);
  // console.log(metadata);

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