import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RatingsBreakdown from '../../client/src/components/RatingsReviews/RatingBreakdown.jsx';
import testData from '../../client/src/testData.jsx';

describe('Render RatingsBreakdown Page', () => {
  const filterSearch = () => {
    return true;
  };

  it('Should render page with Title header', () => {
    render(<RatingsBreakdown
      ratings={testData.metaData.ratings}
      recommend={testData.metaData.recommended}
      stars={3.75}
      filter={filterSearch}
      sort={[1, 1, 1, 1, 1]}
    />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
  });
});
