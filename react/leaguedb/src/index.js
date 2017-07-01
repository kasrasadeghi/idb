import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fetch('http://localhost:5000/api/champion_names', {
  method: 'GET',
  dataType: 'json'
})
.then(r => r.json())
.then(j => {
  console.log(j)
})
.catch(err => console.log(err));


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
