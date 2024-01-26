import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect, useLocation } from 'react-router-dom';
import Root from './components/root.jsx';
import ErrorPage from './components/error-page.jsx';
import Product, { productLoader } from './components/Product.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        loader: () => redirect('/products/40350'),
      },
      {
        path: 'products/:productId',
        element: <Product />,
        loader: productLoader,
      },
    ],
  },
]);

const TrackPageView = () => {
  console.log('TrackPageView mounted')
  const location = useLocation();

  useEffect(() => {
    console.log('document.title:', document.title)
      window.gtag('event', 'page_view', {
        page_location: location.href,
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
  }, [location]);

  return null;
};

const App = () => {
  return (
    <RouterProvider router={router}>
      <TrackPageView />
    </RouterProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
