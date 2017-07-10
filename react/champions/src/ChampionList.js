import React, {Component} from 'react';
import {
  Button,
  Collapse,
  Container,
  Nav,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink,
  Row, Col
} from 'reactstrap';

class LeagueBar extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false
    }
  }

  toggle() {
    this.setState({
      isOpen: !(this.state.isOpen)
    });
  }

  render() {
    return (
      <Navbar color="faded" light toggleable>
        <NavbarToggler right onClick={() => this.toggle()}/>
        <NavbarBrand href="/">LeagueDB</NavbarBrand>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/champions">Champions</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/items">Items</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/classes">Classes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/roles">Roles</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about">About</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    )
  }
}

class ChampionList extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      view: [],
      currentFilter: 'None',
      forwards: true,
      pageNumber: 0
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
      currentFilter: className,
      pageNumber: 0
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

  next() {
    if (this.state.pageNumber < (this.state.view.length / 6 - 1)) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      });
    }
  }

  previous() {
    if (this.state.pageNumber > 0) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      });
    }
  }

  render() {
    let n = this.state.pageNumber * 6;
    let currentView = this.state.view.slice(n, n + 6);
    let counter = 0;

    return (
      <div>
        <LeagueBar/>
        <Container>
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

          <ul>
            <Button onClick={() => this.flip()}>Sort
              Alphabetically {(this.state.forwards) ? "Backwards" : "Forwards"}</Button>
          </ul>

          <ul>
            <Button onClick={() => this.previous()}>Prev</Button>
            <Button>{this.state.pageNumber + 1}</Button>
            <Button onClick={() => this.next()}>Next</Button>
          </ul>

          <Row>
            <Col><ChampionElement data={Object(currentView[counter++])}/></Col>
            <Col><ChampionElement data={Object(currentView[counter++])}/></Col>
            <Col><ChampionElement data={Object(currentView[counter++])}/></Col>
          </Row>
          <Row>
            <Col><ChampionElement data={Object(currentView[counter++])}/></Col>
            <Col><ChampionElement data={Object(currentView[counter++])}/></Col>
            <Col><ChampionElement data={Object(currentView[counter])}/></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

class ChampionElement extends Component {
  render() {
    let data = this.props.data;
    if (data === undefined) return <div/>;
    return (
      <div>
        <a href={"/champions/" + data.name}>
          <figure>
            <figcaption>{data.name}</figcaption>
            <img alt={data.name + "'s icon"}
                 src={"https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + data.icon}/>
          </figure>
        </a>
      </div>
    )
  }
}

export default ChampionList;
