import React, {Component} from 'react';
import {
  Container,
  Card,
  CardBlock,
  CardDeck,
  CardImg,
  CardTitle,
  CardText
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

    let text = (this.props.match === undefined)
      ? data.champions.join(", ")
      : "Matches in:" + this.props.match.join(", ");

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
            {text}
          </CardText>
        </CardBlock>
      </Card>
    );
  }
}

export default ClassList;
