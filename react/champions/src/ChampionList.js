import React, {Component} from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

class ChampionList extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      view: [],
      currentFilter: 'None',
      forwards: true
    };

    fetch('http://leaguedb.me/api/champions', {
      method: 'GET',
      dataType: 'json'
    })
    .then(r => r.json())
    .then(j => {
      console.log("api response received");

      j.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      this.setState({
        list: j,
        view: j
      });
    });
  }

  flip() {
    this.setState({
      list: this.state.list.reverse()
    });
    this.filterChampions(this.state.currentFilter)
  }

  filterChampions(className) {
    this.setState({
      currentFilter: className
    });

    if (className === 'None') {
      this.setState({
        view: this.state.list
      });
      return;
    }

    console.log('filtering by ' + className);
    let view = this.state.list.filter(a => {
      return !(a.classes.indexOf(className) === -1);
    });

    this.setState({
      view: view
    });
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle}/>
          <NavbarBrand href="/">LeagueDB</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/champions">Champions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/items/">Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/classes/">Classes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/roles/">Roles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about/">About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <h4>Filter by Classes:</h4>
        <ul>
          <Button onClick={() => this.filterChampions('None')}>Reset</Button>
          <Button onClick={() => this.filterChampions('Assassin')}>Assassin</Button>
          <Button onClick={() => this.filterChampions('Fighter')}>Fighter</Button>
          <Button onClick={() => this.filterChampions('Mage')}>Mage</Button>
          <Button onClick={() => this.filterChampions('Marksman')}>Marksman</Button>
          <Button onClick={() => this.filterChampions('Support')}>Support</Button>
          <Button onClick={() => this.filterChampions('Tank')}>Tank</Button>
        </ul>

        <Button onClick={() => this.flip()}>Sort Alphabetically {(this.state.forwards)? "Backwards" : "Forwards"}</Button>

        <ListGroup>
          {this.state.view.map((champion) => {
            return <ListGroupItem>
              <a href={"/champions/" + champion.name}>
                <figure>
                  <figcaption>{champion.name}</figcaption>
                  <img alt={champion.name + "'s icon"}
                       src={"https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + champion.icon}/>
                </figure>
              </a>
            </ListGroupItem>
          })}
        </ListGroup>
      </div>
    );
  }
}

export default ChampionList;
