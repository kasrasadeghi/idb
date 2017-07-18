import React, {Component} from 'react';
import {
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Container,
  Row,
  Col,

  Card,
  CardDeck,
  CardText
} from 'reactstrap';

import {ChampionElement} from './ChampionList';
import {ItemElement} from './ItemList';
import {ClassElement} from './ClassList';
import {RoleElement} from './RoleList';

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

class Search extends Component {
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
      searchValue: event.target.value,
      pageNumber: 0
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
      currentModel: model,
      pageNumber: 0
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
      default:
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

    let buttons = (
      <ul>
        <Button color={s[0]} onClick={() => this.setModel('Champions')}>Champions</Button>
        <Button color={s[1]} onClick={() => this.setModel('Items')}>Items</Button>
        <Button color={s[2]} onClick={() => this.setModel('Roles')}>Roles</Button>
        <Button color={s[3]} onClick={() => this.setModel('Classes')}>Classes</Button>
      </ul>
    );

    let modeButtons = (
      <ul>
        {this.state.mode ? "AND" : "OR"}
        <Button onClick={() => this.setState({mode: true})}>AND</Button>
        <Button onClick={() => this.setState({mode: false})}>OR</Button>
      </ul>
    );

    let searchBar = (
      <Row>
        <Col sm="12" md={{size: 8, offset: 2}}><br />
          <InputGroup>
            <InputGroupAddon>Search</InputGroupAddon>
            <Input placeholder="Type in your desires" value={this.state.searchValue}
                   onChange={this.handleChange}/>
          </InputGroup>
        </Col>
      </Row>
    );

    if (this.state.searchValue === "") {
      return (
        <div>
          <Container>
            {searchBar}
            {modeButtons}
            {buttons}
          </Container>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div>
          <Container>
            {searchBar}
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
        return <SearchResult data={c}
                             currentModel={this.state.currentModel}
                             term={this.state.searchValue}
                             mode={this.state.mode}
                             route={this.props.route}/>
      });

      let midView = currentView.slice(3, 6);
      let mid = midView.map(c => {
        return <SearchResult data={c}
                             currentModel={this.state.currentModel}
                             term={this.state.searchValue}
                             mode={this.state.mode}
                             route={this.props.route}/>
      });

      let botView = currentView.slice(6, 9);
      let bot = botView.map(c => {
        return <SearchResult data={c}
                             currentModel={this.state.currentModel}
                             term={this.state.searchValue}
                             mode={this.state.mode}
                             route={this.props.route}/>
      });

      return (
        <div>
          <Container>
            {searchBar}
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
        return <ChampionElement
          data={data}
          match={match}
          term={this.props.term}
          mode={this.props.mode}
          route={this.props.route}/>;
      case "Items":
        return <ItemElement
          data={data}
          match={match}
          term={this.props.term}
          mode={this.props.mode}
          route={this.props.route}/>;
      case "Classes":
        return <ClassElement
          data={data}
          match={match}
          term={this.props.term}
          mode={this.props.mode}
          route={this.props.route}/>;
      case "Roles":
        return <RoleElement
          data={data}
          match={match}
          term={this.props.term}
          mode={this.props.mode}
          route={this.props.route}/>;
      default:
        return <strong>error</strong>
    }
  }
}


export default Search;
