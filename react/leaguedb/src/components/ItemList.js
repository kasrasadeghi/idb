import React, {Component} from 'react';
import {
  Button,
  Container,

  Card,
  CardBlock,
  CardDeck,
  CardImg,
  CardTitle
} from 'reactstrap';

class ItemList extends Component {
  constructor() {
    super();

    this.state = {
      list: [],
      view: [],
      currentFilter: 'None',
      forwards: true,
      pageNumber: 0
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
    if (this.state.pageNumber < (this.state.list.length / 6 - 1)) {
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

    let topView = currentView.slice(0, 3);
    let top = topView.map(c => {
      return <ItemElement data={c}/>
    });

    let botView = currentView.slice(3, 6);
    let bot = botView.map(c => {
      return <ItemElement data={c}/>
    });

    return (
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
          <Button onClick={() => this.previous()}>Previous</Button><Button onClick={() => this.next()}>Next</Button>
        </ul>

        <CardDeck>
          {top}
        </CardDeck>
        <br/>
        <CardDeck>
          {bot}
        </CardDeck>
      </Container>
    );
  }
}

export class ItemElement extends Component {
  render() {
    let data = Object(this.props.data);
    let match = this.props.match;
    let term = this.props.term;

    let rows = [];
    if (match !== undefined) {
      let terms = term.split(" ").filter(ele => {return ele !== ""});
      let res = [];
      for (let i in terms) {
        res.push(new RegExp('(.{0,20})(' + terms[i]  + ')(.{0,20})', 'i'))
      }

      for (let re in res) {
        let matchings = [];
        for (let m in match) {
          let string = data[match[m]];
          if (string.constructor === Array) {
            string = string.join(", ")
          }

          let re_match = string.match(res[re]);
          if (re_match !== null) {
            matchings.push(re_match);
          }
        }

        for (let i in matchings ) {
          rows.push(<div><strong>{match[i]}</strong>: ... {matchings[i][1]}<span style={{backgroundColor: 'yellow'}}>{matchings[i][2]}</span>{matchings[i][3]} ...</div>)
        }
      }
    }

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
          {this.props.match === undefined ? data.classes.join(", ") : rows}
        </CardBlock>
      </Card>
    )
  }
}

export default ItemList;
