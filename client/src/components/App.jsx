import React, {useState, useEffect} from 'react';
import Overview from './Overview/Overview.jsx';
import RelatedOutfit from './RelatedOutfit/Index.jsx';
import RatingsReviews from './RatingsReviews/Index.jsx';
import requests from '../requests.js'
import testData from '../testData.jsx';

const App = () => {
  const [products, setProducts] = useState([]);
  const [current, setCurrent] = useState({});
  const [metadata, setMetadata] = useState([]);
  const [favorites, setFavorites] = useState([]);

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
      {current.id ? <RatingsReviews currentId={current.id} metadata={metadata}/> : <div></div>}
    </div>
  );
}

export default App;