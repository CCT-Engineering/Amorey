import React, { useEffect } from 'react';
import { Outlet, Form, useNavigation, useLocation } from 'react-router-dom';
import local from '../styles/root.css';

export default function Root() {
  const navigation = useNavigation();

  const searching = navigation.location
    && new URLSearchParams(navigation.location.search).has('q');

  console.log('Root mounted')
  const location = useLocation();

  useEffect(() => {
    console.log('document.title:', document.title)
    console.log('location.href:', location.href)
    window.gtag('event', 'page_view', {
      page_location: location.href,
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return (
    <>
      <div id="sidebar">
        {/* <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? 'local.loading' : ''}
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
              className="local.sr-only"
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
