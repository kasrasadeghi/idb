import React, {Component} from 'react';
import {
  Container,
  Card,
  CardBlock,
  CardImg,
  CardTitle
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
      <Card classname="text-center">
        <CardBlock>
          <CardTitle>{data.name}</CardTitle>
        </CardBlock>
        <a href="javascript:void(0)"
           onClick={() => this.props.route("roles", data.name)}>
          <CardImg alt={data.name + "'s icon"} src={"http://leaguedb.me/images/roles/" + data.icon}/>
        </a>
        <CardBlock>
          {this.props.match === undefined ? "" : rows}
        </CardBlock>
      </Card>
    );
  }
}

export default RoleList;
