/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import RelatedOutfit from '../../client/src/components/RelatedOutfit/Index.jsx';
import testData from '../../client/src/testData.jsx';

describe('Render RelatedOutfit Page', () => {
  it('Should render page with Title header', () => {
    render(<RelatedOutfit
      current={testData.product40344Data}
      currentStyles={testData.product40344Styles.results}
      favorites={[]}
      stars={5}
    />);

    const relatedTitle = screen.getByText('RELATED PRODUCTS');
    expect(relatedTitle).toHaveTextContent('RELATED PRODUCTS');

    const outfitTitle = screen.getByText('YOUR OUTFIT');
    expect(outfitTitle).toHaveTextContent('YOUR OUTFIT');

    // const heading = screen.getByRole('heading', { level: 4 });
    // expect(heading).toBeInTheDocument();
  });
});
