import React, {Component} from 'react';
import {
  Container,
  Card,
  CardBlock,
  CardImg,
  CardTitle,
  CardText
} from 'reactstrap';

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
    let roles = this.state.list;
    let counter = 0;
    return (
      <Container>
        <RoleElement data={roles[counter++]}/>
        <br/>
        <RoleElement data={roles[counter++]}/>
        <br/>
        <RoleElement data={roles[counter++]}/>
        <br/>
        <RoleElement data={roles[counter++]}/>
        <br/>
        <RoleElement data={roles[counter]}/>
      </Container>
    );
  }
}

export class RoleElement extends Component {
  render() {
    let data = Object(this.props.data);

    let text =
      // JSON.stringify(data, null, 2);
      (this.props.match === undefined)
        ? data.items
        : "Matches in:" + this.props.match.join(", ");

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
            {text}
          </CardText>
        </CardBlock>
      </Card>
    );
  }
}

export default RoleList;
