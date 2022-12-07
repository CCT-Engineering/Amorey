import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../../client/src/components/App.jsx';

describe('Render App Page', () => {
  it('Should render page with Title header', () => {
    render(<App />);

    const title = screen.getByText('Atelier');
    expect(title).toHaveTextContent('Atelier');

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
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
