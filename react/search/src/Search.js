import React, { Component } from 'react';
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
  NavLink,
  InputGroup,
  InputGroupAddon,
  Input,
  Container,
  Row,
  Col
} from 'reactstrap';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      championList: [],
      view: [],
      currentFilter: 'None',
      forwards: true,
      pageNumber: 0,
      isOpen: false,
      searchValue: ''
    };
    this.toggle         = this.toggle.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.pgLimit = 10;

    fetch('http://leaguedb.me/api/champions', {
      method: 'GET',
      dataType: 'json'
    })
    .then(r => r.json())
    .then(j => {
      j.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      });

      console.log("api ready");
      this.setState({
        championList: j,
      });
    });
  }

  toggle() {
    this.setState({
      isOpen: !(this.state.isOpen)
    });
  }

  // filterSearch(className) {
  //   this.setState({
  //     currentFilter: className,
  //     pageNumber: 0
  //   });
  //
  //   if (className === 'None') {
  //     this.setState({
  //       view: this.state.list
  //     });
  //     return;
  //   }
  //
  //   console.log('filtering by ' + className);
  //   let view = this.state.list.filter(a => {
  //     return !(a.classes.indexOf(className) === -1);
  //   });
  //
  //   this.setState({
  //     view: view
  //   });
  // }

  next() {
    if (this.state.pageNumber < (this.state.view.length / this.pgLimit - 1)) {
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

  handleChange(event) {
    this.setState({
      searchValue: event.target.value
    });
    this.matchModels(new RegExp(event.target.value));
  }

  matchChampions(regex) {
    var list = this.state.championList;
    var matches = [];
    list.forEach(function(ele) {
      if (ele.name.match(regex) !== null) {
        matches.push(ele);
      }
    });
    this.setState({
      view: matches
    }); 
    return matches.length !== 0;
  }

  matchModels(regex) {
    return this.matchChampions(regex);
  }

  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={this.toggle} />
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
              <NavItem>
                <NavLink href="/search">Search</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        <Container>
          <Row>
            <Col sm="12" md={{ size: 8, offset: 2 }}><br />
            <InputGroup>
              <InputGroupAddon>Search</InputGroupAddon>
              <Input placeholder="Type in your desires" value={this.state.searchValue} onChange={this.handleChange} />
            </InputGroup>
            </Col>
          </Row>

            <h4>Filter by Model:</h4>
            <ul>
              <Button onClick={() => this.filterSearch('None')}>Reset</Button>
              <Button onClick={() => this.filterSearch('Champions')}>Champions</Button>
              <Button onClick={() => this.filterSearch('Items')}>Items</Button>
              <Button onClick={() => this.filterSearch('Classes')}>Classes</Button>
              <Button onClick={() => this.filterSearch('Roles')}>Roles</Button>
            </ul>

            <ul>
              <Button onClick={() => this.previous()}>Prev</Button>
              <Button>{this.state.pageNumber + 1}</Button>
              <Button onClick={() => this.next()}>Next</Button>
            </ul>

          <ListGroup>
            {this.state.view.length === 0 ?
                <ListGroupItem>
                    No results found.
                </ListGroupItem>
              : this.state.view.slice(this.state.pageNumber * this.pgLimit, this.state.pageNumber * this.pgLimit + this.pgLimit).map((champion) => {
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
        </Container>
      </div>
    );
  }
}

export default Search;
