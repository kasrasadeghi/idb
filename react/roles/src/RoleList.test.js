import React from 'react';
import ReactDOM from 'react-dom';
import RoleList from './RoleList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RoleList />, div);
});
