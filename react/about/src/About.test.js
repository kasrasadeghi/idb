import React from 'react';
import ReactDOM from 'react-dom';
import App from './Home';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Home />, div);
});
