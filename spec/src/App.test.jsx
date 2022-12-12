/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../client/src/components/App.jsx';
import testData from '../../client/src/testData.jsx';

describe('Render App Page', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<App />);
    return user;
  };

  it('Should scroll so that reviews are visible when "Read All Reviews" is clicked', async () => {
    const user = setup(testData.product40344Data, testData.product40344Styles.results);
    await user.click(await screen
      .findByRole('button', { name: /Read All Reviews/i }));
    expect(await screen.findByRole('heading', { name: /RATINGS & REVIEWS/i }))
      .toBeVisible();
  });

  it('Should click add review button to display new review modal', async () => {
    const user = setup(testData.product40344Data, testData.product40344Styles.results);
    await user.click(await screen
      .findByRole('button', { name: /ADD A REVIEW +/i }));
    expect(await screen.findByRole('heading', { level: 3 }))
      .toBeInTheDocument();
  });
});

// docs recommened query type -> getByRole
// getByRole Options: name, level, hidden, selected, checked, pressed
// other 'getBy' queries -> getByLabelText, getByPlaceholderText, getByText, getByDisplayValue
// other quries -> queryBy... findBy... (Intended for single element, error if multiple results)
// multiple element queries -> getAllBy... queryAllBy... findAllBy...
// https://testing-library.com/docs/queries/about/#byrole

// SOME ASSERTION TESTS - JEST
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
