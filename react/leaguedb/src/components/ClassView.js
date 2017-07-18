import React, {Component} from 'react';

class ClassView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      data: null
    };

    fetch('http://leaguedb.me/api/class/' + props.name, {
      method: 'GET',
      dataType: 'json'
    })
    .then(r => r.json())
    .then(j => {
      console.log("api response received");

      this.setState({
        data: j,
      });
    });
  }

  render() {
    let data = this.state.data;
    if (data === null) return <div/>;
    return (
      <div className="container">
        <img src={ data.icon }/>
        <br/>
        <h1>{ data.name }</h1>

        <p>{ data.description }</p>
        <div className="col-lg-6">
          <h4>Champions:</h4>
          <ul>
            {data.champions.map(champion =>
              <li>
                <a href="javascript:void(0)"
                   onClick={() => this.props.route("champions", champion)}>
                  { champion }
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="col-lg-6">
          <h4>Items:</h4>
          <ul>
            {data.items.map(item =>
              <li>
                <a href="javascript:void(0)"
                   onClick={() => this.props.route("items", item)}>
                  { item }
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default ClassView;