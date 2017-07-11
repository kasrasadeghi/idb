import React, {Component} from 'react';
import {
  Button,
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
  Col,

  Card,
  CardBlock,
  CardDeck,
  CardImg,
  CardTitle,
  CardText
} from 'reactstrap';

function matchAll(obj, query) {
  let matches = [];
  for (let key in obj) {
    if (JSON.stringify(obj[key]).toLowerCase().includes(query.toLowerCase())) {
      matches.push(key);
    }
  }
  return matches;
}

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

class Search2 extends Component {
  constructor() {
    super();

    this.state = {
      champions: [],
      items: [],
      classes: [],
      roles: [],
      forwards: true,
      pageNumber: 0,
      isOpen: false,
      searchValue: ''
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.pgLimit = 9;

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
        champions: j,
      });
    });

    fetch('http://leaguedb.me/api/items', {
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
        items: j,
      });
    });

    fetch('http://leaguedb.me/api/classes', {
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
        classes: j,
      });
    });

    fetch('http://leaguedb.me/api/roles', {
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
        roles: j,
      });
    });
  }

  toggle() {
    this.setState({
      isOpen: !(this.state.isOpen)
    });
  }

  next() {
    if (this.state.pageNumber < (this.getResults().length / this.pgLimit - 1)) {
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
  }

  getResults() {
    return this.state.champions.map(c => {
      return [c, matchAll(c, (this.state.searchValue.toLowerCase()))];
    }).filter(pair => pair[1].length !== 0);
  }

  render() {
    let results = this.getResults();

    let c = this.pgLimit;
    let n = this.state.pageNumber * c;
    let currentView = results.slice(n, n + c);

    if (this.state.searchValue === "") {
      return (
        <div>
          <LeagueBar/>
          <Container>
            <Row>
              <Col sm="12" md={{size: 8, offset: 2}}><br />
                <InputGroup>
                  <InputGroupAddon>Search</InputGroupAddon>
                  <Input placeholder="Type in your desires" value={this.state.searchValue}
                         onChange={this.handleChange}/>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </div>
      )
    }

    if (results.length === 0) {
      return (
        <div>
          <LeagueBar/>
          <Container>
            <Row>
              <Col sm="12" md={{size: 8, offset: 2}}><br />
                <InputGroup>
                  <InputGroupAddon>Search</InputGroupAddon>
                  <Input placeholder="Type in your desires" value={this.state.searchValue}
                         onChange={this.handleChange}/>
                </InputGroup>
              </Col>
            </Row>

            <ul>
              <Button onClick={() => this.previous()}>Prev</Button>
              <Button>{this.state.pageNumber + 1}</Button>
              <Button onClick={() => this.next()}>Next</Button>
            </ul>

            <Card><CardText>No results found.</CardText></Card>
          </Container>
        </div>
      );
    } else {
      let topView = currentView.slice(0, 3);
      let top = topView.map(c => {
        return <SearchResult data={c}/>
      });

      let midView = currentView.slice(3, 6);
      let mid = midView.map(c => {
        return <SearchResult data={c}/>
      });

      let botView = currentView.slice(6, 9);
      let bot = botView.map(c => {
        return <SearchResult data={c}/>
      });

      return (
        <div>
          <LeagueBar/>
          <Container>
            <Row>
              <Col sm="12" md={{size: 8, offset: 2}}><br />
                <InputGroup>
                  <InputGroupAddon>Search</InputGroupAddon>
                  <Input placeholder="Type in your desires" value={this.state.searchValue}
                         onChange={this.handleChange}/>
                </InputGroup>
              </Col>
            </Row>

            <ul>
              <Button onClick={() => this.previous()}>Prev</Button>
              <Button>{this.state.pageNumber + 1}</Button>
              <Button onClick={() => this.next()}>Next</Button>
            </ul>

            <CardDeck>{top}</CardDeck><br/>
            <CardDeck>{mid}</CardDeck><br/>
            <CardDeck>{bot}</CardDeck>
          </Container>
        </div>
      );
    }
  }
}

class SearchResult extends Component {
  render() {
    return (
      <ChampionElement data={this.props.data[0]} match={this.props.data[1]}/>
    );
  }
}

class ChampionElement extends Component {
  render() {
    let data = Object(this.props.data);
    return (
      <Card className="text-center">
        <CardBlock>
          <CardTitle>{data.name}</CardTitle>
        </CardBlock>
        <a href={"/champions/" + data.name}>
          <CardImg alt={data.name + "'s icon"}
                   src={"https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + data.icon}/>
        </a>
        <CardBlock>
          <CardText>
            Matches in: {this.props.match.join(", ")}
          </CardText>
        </CardBlock>
      </Card>
    )
  }
}

export default Search2;
