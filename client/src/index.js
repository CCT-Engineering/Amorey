import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <App />);

console.log('Page Cookie:', JSON.stringify(document.cookie, undefined, "\t"));
