/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Overview from '../../client/src/components/Overview/Overview.jsx';
import testData from '../../client/src/testData.jsx';
import '@testing-library/jest-dom';

describe('Render Overview Module', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<Overview current={testData.productData} />);
    return user;
  }

  it('Should render the product slogan', () => {
    setup();
    const slogan = screen.getByRole('heading', { level: 4 });
    expect(slogan).toHaveTextContent('Blend in to your crowd');
  });

  it('Should have an "overviewMain" section', () => {
    const { container } = render(<Overview current={testData.productData} />);
    const [overviewMain] = container.getElementsByClassName('overviewMain');
    expect(overviewMain).toBeVisible();
  });

  // QUESTIONABLE TEST BELOW - KEEPING FOR REFERENCE
  // it('Should render the product name', () => {
  //   setup();
  //   screen.findByRole('heading', { name: '/Camo Onesie/i' })
  //     .then((productName) => {
  //       console.log('productName:', productName);
  //       expect(productName).toBeVisible();
  //     })
  // });

  // BAD WAY to check that some text is visible (case sensitive)
  it('Should render the product name (2)', () => {
    setup();
    expect(screen.getByRole('heading', { name: 'Camo Onesie' })).toBeVisible();
  });

  // GOOD WAY to check that some text is visible (case insensitive, more flexibility with regex)
  it('Should render the product name (1)', () => {
    setup();
    expect(screen.getByRole('heading', { name: /camo onesie/i })).toBeVisible();
  });

  // it('Should display name of style when its corresponding style thumbnail is clicked (1)', () => {
  //   const user = setup();
  //   screen.findAllByRole('button', { name: /Main Thumbnail Desert Brown/i })
  //     .then((elements) => {
  //       user.click(elements[0]);
  //     })
  //     .then(() => screen.getByRole('heading', { level: 5, name: /style/i }))
  //     .then((styleName) => {
  //       expect(styleName).toHaveTextContent('DESERT BROWN & TAN');
  //     });
  //   // expect(screen.getByRole('heading', { name: /camo onesie/i })).toBeVisible();
  //   // const styleName = screen.getByRole('heading', { level: 5, name: /style/i });
  //   // expect(styleName).toHaveTextContent('DESERT BROWN & TAN');
  // });

  it('Should display name of style when its corresponding style thumbnail is clicked (2)', async () => {
    const user = setup();
    await user.click(await screen.findByRole('button', { name: /Main Thumbnail Desert Brown/i }));
    await screen.findByRole('heading', { level: 5, name: /style/i });
    expect(screen.getByRole('heading', { level: 5, name: /style/i })).toHaveTextContent(/DESERT BROWN & TAN/i);
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
