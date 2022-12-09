import axios from 'axios';

const url = 'http://localhost:3300/';

const requests = {
  // pass in (callback)
  getProducts: (callback) => {
    axios.get(`${url}products`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (product_id, callback)
  getProductInfo: (id, callback) => {
    axios.get(`${url}products/${id}`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (product_id, callback)
  getStyles: (id, callback) => {
    axios.get(`${url}products/${id}/styles`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (product_id, callback)
  getRelated: (id, callback) => {
    axios.get(`${url}products/${id}/related`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (product_id, sort method, callback)
  getReviews: (id, sort, callback) => {
    axios.get(`${url}reviews/?product_id=${id}&sort=${sort}&count=999`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (product_id)
  getMetadata: (id, callback) => {
    axios.get(`${url}reviews/meta/?product_id=${id}`)
      .then(({ data }) => callback(data))
      .catch((err) => console.error(err));
  },

  // pass in (review_id)
  putHelpful: (id, callback) => {
    axios.put(`${url}reviews/${id}/helpful`)
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (review_id)
  putReport: (id, callback) => {
    axios.put(`${url}reviews/${id}/report`)
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (new review object)
  postReview: (review, callback) => {
    axios.post(`${url}reviews`, review)
      .then(() => callback())
      .catch((err) => console.error(err));
  },
};

export default requests;
