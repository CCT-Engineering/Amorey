import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import RatingsReviews from '../../client/src/components/RatingsReviews/Index.jsx';

describe('Render RatingsReviews Page', () => {
  it('Should render page with Title header', () => {
    render(<RatingsReviews />);

    const title = screen.getByText('RATINGS & REVIEWS');
    expect(title).toHaveTextContent('RATINGS & REVIEWS');

    const heading = screen.getByRole('heading', { level: 5 });
    expect(heading).toBeInTheDocument();
  });
});
