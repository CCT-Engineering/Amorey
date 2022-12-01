import React, {useState} from 'react';
import RelatedCard from './RelatedCard.jsx';

const RelatedList = () => {
  //axios
  // axios.get(cur related by id GET /products/:product_id/related)
  //   .then((response) => {
  //     let relateArr = response.data
  let relateArr = [1,2,3]
  return (
    <div>
      <h4>RELATED PRODUCTS</h4>
      <div>carousel-fashion scroll horizontal somehow</div>
      {relateArr.map((relateOne, index) =>
           <RelatedCard key={index.toString()} relateOne={relateOne}/>
      )
      }
    </div>
  );


  //   })

  // return (
  //   <div>
  //     <h4>RELATED PRODUCTS</h4>
  //     <RelatedCard/>
  //   </div>
  // );
};

export default RelatedList;