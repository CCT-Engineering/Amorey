import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
