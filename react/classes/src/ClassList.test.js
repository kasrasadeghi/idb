import React from 'react';
import ReactDOM from 'react-dom';
import ChampionList from './ChampionList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ChampionList />, div);
});
