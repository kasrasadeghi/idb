import React, {Component} from 'react';
import {
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
      list: []
    };

    fetch('http://leaguedb.me/api/items', {
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

        <ListGroup>
          {this.state.list.map((item) => {
            return <ListGroupItem>
              <a href={"/items/" + item.name}>
                <figure>
                  <figcaption>{item.name}</figcaption>
                  <img alt={item.name + "'s icon"}
                       src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/" + item.icon}/>
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
