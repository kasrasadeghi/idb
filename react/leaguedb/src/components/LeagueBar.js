import React, {Component} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
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
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler right onClick={() => this.toggle()}/>
          <NavbarBrand onClick={(e) => this.props.route(e)}>LeagueDB</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink onClick={() => this.props.route("search")}>Search</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.route("champions")}>Champions</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.route("items")}>Items</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.route("classes")}>Classes</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.route("roles")}>Roles</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => this.props.route("about")}>About</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <h2 style={{color: "white"}}>{JSON.stringify(this.props, null, 2)}</h2>
      </div>
    )
  }
}

export default LeagueBar;