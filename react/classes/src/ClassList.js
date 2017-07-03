import React, {Component} from 'react';

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
        {this.state.list.map((_class) => {
          return <div className="row">
              <div className="col-sm-4">
                <a href={"/classes/" + _class.name}>
                  <figure> <figcaption>{_class.name}</figcaption>
                    <img alt={_class.name + "'s icon"} src={"http://leaguedb.me/images/classes/" + _class.icon}/>
                  </figure>
                </a>
              </div>
            </div>
        })}
      </div>
    );
  }
}

export default ClassList;
