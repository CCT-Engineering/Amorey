const url = window.location.href.includes('amazonaws') ? window.location.href : 'http://localhost:3300/';

// getData helper function for GET requests
const getData = (res, callback) => (
  res.json()
    .then((data) => callback(data))
    .catch((err) => console.error(err))
);

const requests = {
  // pass in (callback, page, count)
  getProducts: (callback, pg = 1, cnt = 1) => {
    fetch(`${url}products/?page=${pg}&count=${cnt}`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, callback)
  getProductInfo: (id, callback) => {
    fetch(`${url}products/${id}`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, callback)
  getStyles: (id, callback) => {
    fetch(`${url}products/${id}/styles`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, callback)
  getRelated: (id, callback) => {
    fetch(`${url}products/${id}/related`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, sort method, callback)
  getReviews: (id, sort, callback, pg = 1, cnt = 999) => {
    fetch(`${url}reviews/?product_id=${id}&sort=${sort}&page=${pg}&count=${cnt}`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, callback)
  getMetadata: (id, callback) => {
    fetch(`${url}reviews/meta/?product_id=${id}`)
      .then((res) => getData(res, callback));
  },

  // pass in (product_id, callback)
  getQuestions: (id, callback, pg = 1, cnt = 999) => {
    fetch(`${url}qa/questions/?product_id=${id}&page=${pg}&count=${cnt}`)
      .then((res) => getData(res, callback));
  },

  // pass in (review_id)
  putHelpful: (id, callback) => {
    fetch(`${url}reviews/${id}/helpful`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (review_id)
  putReport: (id, callback) => {
    fetch(`${url}reviews/${id}/report`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (question_id)
  putHelpfulQuestion: (id, callback) => {
    fetch(`${url}qa/questions/${id}/helpful`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (question_id)
  putReportQuestion: (id, callback) => {
    fetch(`${url}qa/questions/${id}/report`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (answer_id)
  putHelpfulAnswer: (id, callback) => {
    fetch(`${url}qa/answers/${id}/helpful`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (answer_id)
  putReportAnswer: (id, callback) => {
    fetch(`${url}qa/answers/${id}/report`, { method: 'PUT' })
      .then(() => callback())
      .catch((err) => console.error(err));
  },

  // pass in (new review object)
  postReview: (review, callback) => {
    console.log('review:', review);
    const options = {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(review),
    };
    fetch(`${url}reviews`, options)
      .then(() => callback())
      .catch((err) => console.error(err));
  },
};

export default requests;
