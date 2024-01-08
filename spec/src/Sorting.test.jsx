/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../client/src/components/Product.jsx';

describe('Render App Page', () => {
  const setup = () => {
    const user = userEvent.setup();
    render(<App />);
    return user;
  };

  it('Should change the sort order of the review list', async () => {
    const user = setup();
    await user.click(await screen
      .findByRole('option', { name: 'Newest' }));
    expect(screen.getByRole('menu', { name: 'Sort Method' }))
      .toHaveTextContent('newest');
  });
});
