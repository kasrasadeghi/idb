import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var request = new Request('https://www.google.com/', {
    header: new Headers({
        'Content-Type': 'text/plain'
    }) 
});

fetch('https://leaguedb.me/api/champion_names').then(function(response) {
	  console.log(response);
}).catch(function(err) {
	  console.log("sad");
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
