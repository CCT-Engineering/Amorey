/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../client/src/components/App.jsx';

describe('Render App Page', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<App />);
    return user;
  };

  it('Should scroll so that reviews are visible when "Read All Reviews" is clicked', async () => {
    const user = setup();
    await user.click(await screen
      .findByRole('button', { name: /Read All \d+ Reviews/i }));
    expect(await screen.findByRole('heading', { name: /RATINGS & REVIEWS/i }))
      .toBeVisible();
  });

  // it('Should add product to Your Outfit when heart button is clicked', async () => {
  //   const user = setup();
  //   // breaking in line below:
  //   await user.click(await screen
  //     .findByRole('button', { name: /add or remove to outfit/i }, { timeout: 3000 }));
  //   expect(screen.getByRole('button', { name: /Your Outfit: Camo Onesie/i }))
  //     .toBeInTheDocument();
  // });
});

// docs recommened query type -> getByRole
// getByRole Options: name, level, hidden, selected, checked, pressed
// other 'getBy' queries -> getByLabelText, getByPlaceholderText, getByText, getByDisplayValue
// other quries -> queryBy... findBy... (Intended for single element, error if multiple results)
// multiple element queries -> getAllBy... queryAllBy... findAllBy...
// https://testing-library.com/docs/queries/about/#byrole
// LIST OF JEST DOM MATCHERS: https://github.com/testing-library/jest-dom

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
