import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var request = new Request('http://localhost:5000/api/champion_names', {
    header: new Headers({
        'Content-Type': 'application/json'
    }) 
});

fetch(request)
    .then(res => {
        console.log(res);
        return res.text()
//                  .then(text => {
//                      return text ? JSON.parse(text) : {'text': text}
//                 })
        ;
    })
    .then(json => {
        console.log('json');
        console.log(json);
    });


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
