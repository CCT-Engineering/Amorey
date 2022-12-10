const calculateStarAverage = (ratings) => {
  let totalStars = 0;
  let ratingsCount = 0;

  Object.keys(ratings).forEach((key) => {
    totalStars += key * ratings[key];
    ratingsCount += Number(ratings[key]);
  });
  const average = totalStars / ratingsCount;
  return (Math.round(average * 4) / 4).toFixed(2);
};

export default calculateStarAverage;
