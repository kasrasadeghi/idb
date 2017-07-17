import React, {Component} from 'react';
import './App.css';
import Home from './components/Home';
import LeagueBar from './components/LeagueBar';
import Search from './components/Search';
import ChampionList from './components/ChampionList';
import ItemList from './components/ItemList';
import ClassList from './components/ClassList';
import RoleList from "./components/RoleList";
import About from "./components/About";

class App extends Component {
  constructor() {
    super();

    this.state = {
      current: "home"
    };
  }

  route(value) {
    this.setState({
      current: value
    });
  }

  currentMain() {
    switch (this.state.current) {
      default:
      case "home":
        return <Home/>;
      case "search":
        return <Search/>;
      case "champions":
        return <ChampionList/>;
      case "items":
        return <ItemList/>;
      case "classes":
        return <ClassList/>;
      case "roles":
        return <RoleList/>;
      case "about":
        return <About/>;
    }
  }

  render() {
    return (
      <div>
        <LeagueBar route={(x) => this.route(x)}/>
        {this.currentMain()}
      </div>
    );
  }
}

export default App;
