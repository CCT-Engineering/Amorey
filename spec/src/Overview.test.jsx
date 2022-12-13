/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overview from '../../client/src/components/Overview/Overview.jsx';
import testData from '../../client/src/testData.jsx';

describe('Render Overview Module', () => {
  const setup = (current, currentStyles, stars = 5, favorites = [], reviewsQty = 5) => {
    const user = userEvent.setup();
    render(<Overview
      current={current}
      currentStyles={currentStyles}
      stars={stars}
      favorites={favorites}
      reviewsQty={reviewsQty}
    />);
    return user;
  };

  it('Should render the product slogan', () => {
    setup(testData.product40344Data, testData.product40344Styles.results);
    const slogan = screen.getByRole('heading', { level: 4 });
    expect(slogan).toHaveTextContent('Blend in to your crowd');
  });

  // Below test is for demonstration purposes only. Better to not select by class name.
  it('Should have an "overviewMain" section', () => {
    const { container } = render(<Overview
      current={testData.product40344Data}
      currentStyles={testData.product40344Styles.results}
      stars={5}
      favorites={[]}
      reviewsQty={5}
    />);
    const [overviewMain] = container.getElementsByClassName('overviewMain');
    expect(overviewMain).toBeVisible();
  });

  // BAD WAY to check that some text is visible (case sensitive)
  it('Should render the product name (2)', () => {
    setup(testData.product40344Data, testData.product40344Styles.results);
    expect(screen.getByRole('heading', { name: 'Camo Onesie' })).toBeVisible();
  });

  // GOOD WAY to check that some text is visible (case insensitive, more flexibility with regex)
  it('Should render the product name (1)', () => {
    setup(testData.product40344Data, testData.product40344Styles.results);
    expect(screen.getByRole('heading', { name: /camo onesie/i })).toBeVisible();
  });

  it('Should display name of style when its corresponding style thumb is clicked', async () => {
    const user = setup(testData.product40344Data, testData.product40344Styles.results);
    await user.click(await screen
      .findByRole('button', { name: /Main Thumbnail Desert Brown/i }));
    expect(screen.getByRole('heading', { level: 5, name: /style/i }))
      .toHaveTextContent(/DESERT BROWN & TAN/i);
  });

  it('Should display "photo unavailable" when photo url is null', async () => {
    const user = setup(testData.prod40345Data, testData.prod40345Styles.results);
    await user.click(await screen
      .findByRole('button', { name: /Main Thumbnail Black Lenses & Gold Frame/i }));
    expect(screen.getByRole('button', { name: /Main photo 0 of Black Lenses & Gold Frame/i }))
      .toHaveTextContent(/photo unavailable/i);
  });
});

// docs recommened query type -> getByRole
// getByRole Options: name, level, hidden, selected, checked, pressed
// other 'getBy' queries -> getByLabelText, getByPlaceholderText, getByText, getByDisplayValue
// other quries -> queryBy... findBy... (Intended for single element, error if multiple results)
// multiple element queries -> getAllBy... queryAllBy... findAllBy...
// https://testing-library.com/docs/queries/about/#byrole

// SOME ASSERTION TESTS - JEST (documentation for at least some of these is here: https://github.com/testing-library/jest-dom)
// --------------------
// toBeDisabled
// toBeEnabled
// toBeEmpty
// toBeEmptyDOMElement
// toBeInTheDocument
// toBeInvalid
// toBeRequired
// toBeValid
// toBeVisible
// toContainElement
// toContainHTML
// toHaveAttribute
// toHaveClass
// toHaveFocus
// toHaveFormValues
// toHaveStyle
// toHaveTextContent
// toHaveValue
// toHaveDisplayValue
// toBeChecked
// toBePartiallyChecked
