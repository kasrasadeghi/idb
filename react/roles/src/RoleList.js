import React, {Component} from 'react';

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

      j.sort((a,b) => {
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
    return (
      <div className="container">
        {this.state.list.map((roles) => {
          return <div className="row">
              <div className="col-sm-4">
                <a href={"/roles/" + roles.name}>
                  <figure> <figcaption>{roles.name}</figcaption>
                    <img alt={roles.name + "'s icon"} src={"http://leaguedb.me/images/roles/" + roles.icon}/>
                  </figure>
                </a>
              </div>
            </div>
        })}
      </div>
    );
  }
}

export default RoleList;
