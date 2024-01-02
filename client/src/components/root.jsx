import React from 'react';
import {
  Outlet,
  Form,
  useNavigation,
} from 'react-router-dom';

export default function Root() {
  const navigation = useNavigation();

  const searching = navigation.location
    && new URLSearchParams(navigation.location.search).has('q');

  return (
    <>
      <div id="sidebar">
        {/* <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'loading' : ''}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={!searching}
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div> */}
      </div>
      <div
        id="detail"
        className={navigation.state === 'loading' ? 'loading' : ''}
      >
        <Outlet />
      </div>
    </>
  );
}
