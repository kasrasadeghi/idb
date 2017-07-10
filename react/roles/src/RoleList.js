import React, {Component} from 'react';
import {
  ListGroup,
  ListGroupItem,
  Collapse,
  Container,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
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
              <NavLink href="/search">Search</NavLink>
            </NavItem>
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

class RoleList extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };

    fetch('http://leaguedb.me/api/roles', {
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
        list: j
      });
    });
  }

  render() {
    return (
      <div>
        <LeagueBar/>

        <Container>
          <ListGroup>
            {this.state.list.map((roles) => {
              return <ListGroupItem>
                <a href={"/roles/" + roles.name}>
                  <figure>
                    <figcaption>{roles.name}</figcaption>
                    <img alt={roles.name + "'s icon"} src={"http://leaguedb.me/images/roles/" + roles.icon}/>
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

export default RoleList;
