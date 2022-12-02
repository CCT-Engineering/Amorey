import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import Sorting from './Sorting.jsx';
import RatingBreakdown from './RatingBreakdown.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';

const reviewData = [{
  "product": "2",
  "page": 0,
  "count": 5,
  "results": [
    {
      "review_id": 5,
      "rating": 3,
      "summary": "I'm enjoying wearing these shades",
      "recommend": false,
      "response": null,
      "body": "Comfortable and practical.",
      "date": "2019-04-14T00:00:00.000Z",
      "reviewer_name": "shortandsweeet",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/review_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/review_5_photo_number_2.jpg"
        },
      ]
    }
  ]
}];

const metaData = {
  "product_id": "2",
  "ratings": {
    2: 1,
    3: 1,
    4: 2,
  },
  "recommended": {
    0: 5
  },
  "characteristics": {
    "Size": {
      "id": 14,
      "value": "4.0000"
    },
    "Width": {
      "id": 15,
      "value": "3.5000"
    },
    "Comfort": {
      "id": 16,
      "value": "4.0000"
    },
  }
};

const Index = () => {
  const [meta, setMeta] = React.useState(metaData);
  const [reviews, setReviews] = React.useState(reviewData);
  console.log(reviews[0].results);

  return (
    <div>
      <h4>RATINGS & REVIEWS</h4>
      <div><RatingBreakdown ratings={meta.ratings} recommended={meta.recommended}/></div>
      <div><ProductBreakdown characteristics={meta.characteristics}/></div>
      <div><Sorting numberOfReviews={reviews[0].results}/></div>
      <div><ReviewsList reviews={reviews.results}/></div>
    </div>
  );
};

export default Index;