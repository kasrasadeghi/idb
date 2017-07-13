import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import LeagueBar from "./components/LeagueBar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      current: "home"
    };
  }

  route(e) {
    console.log(e);
    // const value = e.target.value;
    // this.setState({current: value});
  }

  currentMain() {
    switch (this.state.current) {
      case "home":
        return <Home route={this.route.bind(this)}/>;
      case "search":
      case "champions":
      case "items":
      case "classes":
      case "roles":
      case "about":
        break;
    }
  }

  render() {
    return (
      <div>
        <LeagueBar/>
        <h1>{this.state.current}</h1>
        {this.currentMain()}
      </div>
    );
  }
}

export default App;
