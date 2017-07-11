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

function matchAll(obj, query, mode) {//mode = true for AND, false for OR
  let matches = [];
  let words = query.toLowerCase().split(' ');
  if (mode) {
    //AND
    for (let key in obj) {
      let match = words.every((word) => {
        return JSON.stringify(obj[key]).toLowerCase().includes(word);
      });
      if (match) {
        matches.push(key);
      }
    }
  } else {
    //OR
    for (let key in obj) {
      let match = words.some((word) => {
        return JSON.stringify(obj[key]).toLowerCase().includes(word);
      });
      if (match) {
        matches.push(key);
      }
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
      searchValue: '',
      currentModel: "Champions",
      mode: false
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
    return this.state[this.state.currentModel.toLowerCase()].map(c => {
      return [
        c,
        matchAll(c,
          this.state.searchValue.trim().toLowerCase(),
          this.state.mode)
      ];
    }).filter(pair => pair[1].length !== 0);
  }

  setModel(model) {
    this.setState({
      currentModel: model
    })
  }

  styles() {
    let styleList = [
      "secondary",
      "secondary",
      "secondary",
      "secondary"
    ];

    let i = 0;
    switch (this.state.currentModel) {
      case "Champions":
        i = 0;
        break;
      case "Items":
        i = 1;
        break;
      case "Roles":
        i = 2;
        break;
      case "Classes":
        i = 3;
        break;
    }

    styleList[i] = "primary";
    return styleList;
  }

  render() {
    let results = this.getResults();

    let c = this.pgLimit;
    let n = this.state.pageNumber * c;
    let currentView = results.slice(n, n + c);
    let s = this.styles();

    let buttons = <ul>
      <Button color={s[0]} onClick={() => this.setModel('Champions')}>Champions</Button>
      <Button color={s[1]} onClick={() => this.setModel('Items')}>Items</Button>
      <Button color={s[2]} onClick={() => this.setModel('Roles')}>Roles</Button>
      <Button color={s[3]} onClick={() => this.setModel('Classes')}>Classes</Button>
    </ul>;

    let modeButtons = <ul>
      {this.state.mode? "AND": "OR"}
      <Button onClick={() => this.setState({mode: true})}>AND</Button>
      <Button onClick={() => this.setState({mode: false})}>OR</Button>
    </ul>;

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

            {modeButtons}
            {buttons}

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

            {modeButtons}
            {buttons}

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
        return <SearchResult data={c} currentModel={this.state.currentModel}/>
      });

      let midView = currentView.slice(3, 6);
      let mid = midView.map(c => {
        return <SearchResult data={c} currentModel={this.state.currentModel}/>
      });

      let botView = currentView.slice(6, 9);
      let bot = botView.map(c => {
        return <SearchResult data={c} currentModel={this.state.currentModel}/>
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

            {modeButtons}
            {buttons}

            <ul>
              <Button onClick={() => this.previous()}>Prev</Button>
              <Button>{this.state.pageNumber + 1}</Button>
              <Button onClick={() => this.next()}>Next</Button>
            </ul>

            {this.state.currentModel}

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
    let data = this.props.data[0];
    let match = this.props.data[1];
    switch (this.props.currentModel) {
      case "Champions":
        return <ChampionElement data={data} match={match}/>;
      case "Items":
        return <ItemElement data={data} match={match}/>;
      case "Classes":
        return <ClassElement data={data} match={match}/>;
      case "Roles":
        return <RoleElement data={data} match={match}/>;
    }
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

class ItemElement extends Component {
  render() {
    let data = this.props.data;
    return (
      <Card className="text-center">
        <CardBlock>
          <CardTitle>{data.name}</CardTitle>
        </CardBlock>
        <a href={"/items/" + data.name}>
          <CardImg alt={data.name + "'s icon"}
                   src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/" + data.icon}/>
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

class ClassElement extends Component {
  render() {
    let data = Object(this.props.data);
    return (
      <Card className="text-center">
        <CardBlock>
          <CardTitle>{data.name}</CardTitle>
        </CardBlock>
        <a href={"/classes/" + data.name}>
          <CardImg alt={data.name + "'s icon"} src={"http://leaguedb.me/images/classes/" + data.icon}/>
        </a>
        <CardBlock>
          <CardText>
            Matches in: {this.props.match.join(", ")}
          </CardText>
        </CardBlock>
      </Card>
    );
  }
}

class RoleElement extends Component {
  render() {
    let data = Object(this.props.data);
    return (
      <Card classname="text-center">
        <CardBlock>
          <CardTitle>{data.name}</CardTitle>
        </CardBlock>
        <a href={"/roles/" + data.name}>
          <CardImg alt={data.name + "'s icon"} src={"http://leaguedb.me/images/roles/" + data.icon}/>
        </a>
        <CardBlock>
          <CardText>
            Matches in: {this.props.match.join(", ")}
          </CardText>
        </CardBlock>
      </Card>
    );
  }
}


export default Search2;
