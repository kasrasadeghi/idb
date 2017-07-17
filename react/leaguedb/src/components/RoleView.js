import React, {Component} from 'react';

class RoleView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      data: null
    };

    fetch('http://leaguedb.me/api/role/' + props.name, {
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
        <h1>{ data.name }</h1>
        <div className="modal-body row">
          <div className="col-md-6">
            <img src={ data.icon }/>
          </div>
        </div>
        <div className="col-md-4">
          <h3>Champions</h3>
          <ul>
            {data.champions.map(champion =>
              <li>
                <a href={"/champions/" + champion}>{ champion }</a>
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Items</h3>
          <ul>
            {data.items.map(thing =>
              <li><a href={"/items/" + thing}>{thing}</a></li>
            )}
          </ul>
        </div>
        <div className="col-md-4">
          <h3>Classes</h3>
          <ul>
            {data.classes.map(_class =>
              <li>
                <a href={"/classes/" + _class}>{_class}</a>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default RoleView;