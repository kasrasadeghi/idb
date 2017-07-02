import React from 'react';
import ReactDOM from 'react-dom';
import ItemList from './ItemList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ItemList />, div);
});
