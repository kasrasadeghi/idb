import React, {Component} from 'react';
import {
  Container,
  Card,
  CardBlock,
  CardDeck,
  CardImg,
  CardTitle
} from 'reactstrap';

class ClassList extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };

    fetch('http://leaguedb.me/api/classes', {
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
    let currentView = this.state.list;

    let topView = currentView.slice(0, 3);
    let top = topView.map(c => {
      return <ClassElement data={c}/>
    });

    let botView = currentView.slice(3, 6);
    let bot = botView.map(c => {
      return <ClassElement data={c}/>
    });

    return (
      <Container>
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

export class ClassElement extends Component {
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
        <a href={"/classes/" + data.name}>
          <CardImg alt={data.name + "'s icon"} src={"http://leaguedb.me/images/classes/" + data.icon}/>
        </a>
        <CardBlock>
          {this.props.match === undefined ? "" : rows}
        </CardBlock>
      </Card>
    );
  }
}

export default ClassList;
