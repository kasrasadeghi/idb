import React, {Component} from 'react';

class ChampionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      data: null
    };

    fetch('http://leaguedb.me/api/champion/' + props.name, {
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
      <div>
        <div className="container">
          <h1>{ data.name }</h1>
          <div className="modal-body row">
            <div className="col-md-6">
              <img src={data.icon}/>
            </div>
            <div className="col-md-6">
              { data.lore }
            </div>
          </div>
          <div className="col-lg-6">
            <h3>Items</h3>
            <ul>
              {data.items.map(thing =>
                <li>
                  <a href="javascript:void(0)"
                     onClick={() => this.props.route("items", thing)}>
                    {thing}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="col-lg-6">
            <h3>Classes</h3>
            <ul>
              {data.classes.map(thing =>
                <li>
                  <a href="javascript:void(0)"
                     onClick={() => this.props.route("classes", thing)}>
                    {thing}
                  </a>
                </li>
              )}
            </ul>
            <h3>Roles</h3>
            <ul>
              {data.roles.map(thing =>
                <li>
                  <a href="javascript:void(0)"
                     onClick={() => this.props.route("roles", thing)}>
                    {thing}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionView;