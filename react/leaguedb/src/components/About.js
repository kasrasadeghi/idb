import React, {Component} from 'react';
import {
  Container,
  Row,
  Col,
  Table
} from 'reactstrap';

class About extends Component {
  constructor() {
    super();

    this.state = {
      commits: {
        "Tschriber": 0,
        "flippedAben": 0,
        "kasrasadeghi": 0,
        "SpicyKitten": 0,
        "total": 0
      },
      todi: 0,
      beni: 0,
      kasi: 0
    };

    fetch('https://api.github.com/repos/kasrasadeghi/idb/stats/contributors', {
      method: 'GET',
      dataType: 'json'
    })
    .then(r => r.json())
    .then(j => {
      var updatedCommits = {}
      var sum = 0;
      for (var i = 0; i < j.length; i++) {
        updatedCommits[j[i].author.login] = j[i].total;
        sum += j[i].total;
      }
      updatedCommits['total'] = sum;
      this.setState({
        commits: updatedCommits
      });
    });


    var members = ["toddschriber", "benyangs", "kasrasadeghi1"];
    for (var mem in members) {
      (mem => {
        fetch('https://api.trello.com/1/members/' + mem + '/cards', {
          method: 'GET',
          dataType: 'json'
        })
        .then(r => r.json())
        .then(j => {
          switch (mem) {
            case members[0]:
              this.setState({
                todi: j.length,
              });
              break;
            case members[1]:
              this.setState({
                beni: j.length,
              });
              break;
            case members[2]:
              this.setState({
                kasi: j.length,
              });
              break;
            default:
              break;
          }
        })
      })(members[mem]);
    }
  }

  render() {
    return (
      <div>
        <Container>
          <br />
          <br />
          <h2>Purpose</h2>
          <p>
            This site contains information about the game League of Legends. Interested parties can
            find information
            about playable champions, roles and classes of each champion, as well as recommended
            items for each champion
            or class.
          </p>
          <br />
          <h2>Our Bronze 5 Staff</h2>
          <br />
          <Row>
            <Col xs="6">
              <br />
              <img src="static/images/profile/Kasra.jpg"/>
              <br />
              <h3> Kasra </h3>
              I'm a computer science and math major at UT Austin. I like programming languages,
              compilers, playing guitar, and cooking.
              <br/>
              <br />
              Responsibilities:
              <ul>
                <li>Server maintenance and setup</li>
                <li>Docker integration</li>
                <li>React implementation</li>
                <li>Build system design</li>
              </ul>
              <br/>
              <br />
              <br/>
              <br />
              No. of Commits: {this.state.commits['kasrasadeghi']}
              <br/>
              <br />
              No. of Issues: {this.state.kasi}
              <br/>
              <br />
              No. of Unit Tests: 0
              <br/>
              <br />
            </Col>
            <Col xs="6">
              <br />
              <img src="static/images/profile/Ben.jpg"/>
              <br />
              <h3> Ben </h3>
              I'm a Junior computer science and math major at UT Austin. I like
              olympic weightlifting, playing saxophone and guitar, and playing
              League of Legends. Programming is alright, I guess.
              <br/>
              <br />
              Responsibilities:
              <br/>
              <br />
              Setting up the database, implementing the API, making the GUI.
              <br/>
              <br />
              No. of Commits: {this.state.commits['flippedAben']}
              <br/>
              <br />
              No. of Issues: {this.state.beni}
              <br/>
              <br />
              No. of Unit Tests: 19
              <br/>
              <br />
            </Col>
          </Row>
          <Row>
            <Col>
              <br />
              <img src="static/images/profile/Todd.png"/>
              <br />
              <h3> Todd </h3>
              I'm a senior Computer Science Major at UT Austin. 
              I enjoy reading, Ultimate Frisbee, and running. 
              I'm also a decent League of Legends player.
              <br/>
              <br/>
              Responsibilities:
              <br/>
              <br/>
              Basic templates, About page, Misc. Scripts, General Formatting and Design
              <br/>
              <br/>
              No. of Commits: {this.state.commits['Tschriber']}
              <br/>
              <br/>
              No. of Issues: {this.state.todi}
              <br/>
              <br/>
              No. of Unit Tests: 0
              <br/>
              <br/>
            </Col>
          </Row>
          <br/>
          <h2>Stats, Links, Sources and More</h2>
          <br/>
          <Row>
            <Col>
              <Table bordered>
                <thead>
                <tr>
                  <th>Metric</th>
                  <th>Number</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Commits</td>
                  <td> { this.state.commits['total']-this.state.commits['SpicyKitten'] }
                  </td>
                </tr>
                <tr>
                  <td>Issues</td>
                  <td>{this.state.todi + this.state.beni + this.state.kasi}</td>
                </tr>
                <tr>
                  <td>Unit Tests</td>
                  <td>19</td>
                </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table bordered>
                <thead>
                <tr>
                  <th>Sources</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <a href="http://artbook.na.leagueoflegends.com/en_US/volume-one">Art</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://developer.riotgames.com/">League of Legends API</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="http://leagueoflegends.wikia.com/api/v1/">LoL Wiki API</a>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table bordered>
                <thead>
                <tr>
                  <th>Tools</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Flask, SQLAlchemy</td>
                </tr>
                <tr>
                  <td>Bootstrap, React</td>
                </tr>
                <tr>
                  <td>PostgreSQL</td>
                </tr>
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table bordered>
                <tbody>
                <tr>
                  <td>
                    <a href="https://github.com/kasrasadeghi/idb">Github Repo</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="http://docs.leaguedbapi.apiary.io/">League DB API Docs</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://trello.com/b/6BIgkiSa/leaguedb-general">Trello Issue
                      Tracker</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <a href="https://yuml.me/78eb6a39">yUML Diagram</a>
                  </td>
                </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <br />
          <h2><a href="https://utexas.box.com/s/2lryl4g9f1y9tj3ml1soi4uh19mrhsok">Technical
            Report</a></h2>
          <br />
        </Container>
      </div>
    )
  }
}

export default About;
