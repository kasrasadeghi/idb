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

fetch('https://www.google.com/').then(function(response) {
	  console.log("hallo");
}).catch(function(err) {
	  console.log("sad");
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
