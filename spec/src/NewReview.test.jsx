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

  it('Should click add review button and then submit a review', async () => {
    const user = setup();
    await user.click(await screen
      .findByRole('button', { name: 'Add A Review +' }));
    expect(await screen.findByRole('img', { name: 'Form Logo' }))
      .toBeInTheDocument();
    await user.click(await screen
      .findByRole('button', { name: '5 Star' }));
    await user.click(await screen
      .findByRole('button', { name: 'Recommend Yes' }));
    await user.click(await screen
      .findByRole('button', { name: 'Fit 5' }));
    await user.click(await screen
      .findByRole('button', { name: 'Length 5' }));
    await user.click(await screen
      .findByRole('button', { name: 'Comfort 5' }));
    await user.click(await screen
      .findByRole('button', { name: 'Quality 5' }));
    await user.click(await screen
      .findByRole('textbox', { name: 'Summary Input' }));
    await user.keyboard('This is a test that was submitted with user click and keyboard events', await screen
      .findByRole('textbox', { name: 'Summary Input' }));
    await user.click(await screen
      .findByRole('textbox', { name: 'Body Input' }));
    await user.keyboard('Test', await screen
      .findByRole('textbox', { name: 'Body Input' }));
    await user.click(await screen
      .findByRole('textbox', { name: 'Username Input' }));
    await user.keyboard('Test123', await screen
      .findByRole('textbox', { name: 'Username Input' }));
    await user.click(await screen
      .findByRole('textbox', { name: 'Email Input' }));
    await user.keyboard('Test@gmail.com', await screen
      .findByRole('textbox', { name: 'Email Input' }));
    await user.click(await screen
      .findByRole('button', { name: 'Submit Review' }));
    // expect(await screen.findByRole('img', { name: 'Form Logo' })).toBeInvalid();
  });
});
