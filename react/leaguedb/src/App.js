import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import LeagueBar from './components/LeagueBar';
import Search from './components/Search';

import ChampionView from "./components/ChampionView";
import ItemView from "./components/ItemView";
import ClassView from "./components/ClassView";
import RoleView from "./components/RoleView";

import ChampionList from "./components/ChampionList";
import ItemList from "./components/ItemList";
import ClassList from "./components/ClassList";
import RoleList from "./components/RoleList";

import Edit from "./components/Edit"
import About from "./components/About";


class App extends Component {
  constructor() {
    super();

    this.state = {
      current: "home", // the current overall state
      particle: "none"   // the current viewed particle
    };
  }

  route(value, particle) {
    this.setState({
      current: value,
      particle: particle
    });
  }

  currentMain() {
    if (this.state.particle === "none") {
      switch (this.state.current) {
        default:
        case "home":
          return <Home/>;
        case "search":
          return <Search route={(model, particle) => this.route(model, particle)}/>;
        case "edit":
          return <Edit/>;
        case "champions":
          return <ChampionList
            route={(model, particle) => this.route(model, particle)}/>;
        case "items":
          return <ItemList
            route={(model, particle) => this.route(model, particle)}/>;
        case "classes":
          return <ClassList
            route={(model, particle) => this.route(model, particle)}/>;
        case "roles":
          return <RoleList
            route={(model, particle) => this.route(model, particle)}/>;
        case "about":
          return <About/>;
      }
    } else {
      switch (this.state.current) {
        default:
        case "home":
          return <Home/>;
        case "search":
          return <Search/>;
        case "champions":
          return <ChampionView
            name={this.state.particle}
            route={(model, particle) => this.route(model, particle)}/>;
        case "items":
          return <ItemView
            name={this.state.particle}
            route={(model, particle) => this.route(model, particle)}/>;
        case "classes":
          return <ClassView
            name={this.state.particle}
            route={(model, particle) => this.route(model, particle)}/>;
        case "roles":
          return <RoleView
            name={this.state.particle}
            route={(model, particle) => this.route(model, particle)}/>;
        case "about":
          return <About/>;
      }
    }
  }

  render() {

    return (
      <div>
        <LeagueBar route={(x) => this.route(x, "none")}/>
        {this.currentMain()}
      </div>
    );
  }
}

export default App;
