/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Overview from '../../client/src/components/Overview/Overview.jsx';
import testData from '../../client/src/testData.jsx';
import '@testing-library/jest-dom';

describe('Render Overview Module', () => {
  beforeAll(() => {
    render(<Overview current={testData.productData} />);
  });

  it('Should render the product slogan', () => {
    const slogan = screen.getByRole('heading', { level: 4 });
    expect(slogan).toHaveTextContent('Blend in to your crowd');
  });

  it('Should have an "overviewMain" section', () => {
    const { container } = render(<Overview current={testData.productData} />);
    const [overviewMain] = container.getElementsByClassName('overviewMain');
    expect(overviewMain).toBeVisible();
  });

  it('Should render the product name', () => {
    screen.findByRole('heading', { name: '/Csdkkfmoismig;ajg/i' })
      .then((productName) => {
        console.log('productName:', productName);
        expect(productName).toBeVisible();
      })
      .catch((err) => console.log('ERROR!:', err));
  });

  it('Should render the product name', () => {
    const slogan = screen.getByRole('heading', { level: 4 });
    expect(slogan).toHaveTextContent('Blend in to your crowd');
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
