import React, {Component} from 'react';

class ItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      data: null
    };

    fetch('http://leaguedb.me/api/item/' + props.name, {
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
        <h1><img src={ data.icon }/> {data.name }</h1>

        <h4>Categories:</h4>
        <ul>
          {data.categories.map(category =>
            category
          )}
        </ul>

        <h4>Champions:</h4>
        <ul>
          {data.champions.map(champion =>
            <li>
              <a href={"/champions/" + champion }> - { champion }</a>
            </li>
          )}
        </ul>

        <h4>Roles:</h4>
        <ul>
          {data.roles.map(role =>
            <li>
              <a href={"/roles/" + role}>{ role }</a>
            </li>
          )}
        </ul>

        <h4>Classes:</h4>
        <ul>
          {data.classes.map(_class =>
            <li>
              <a href={"/classes/" + _class}>{_class}</a>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default ItemView;