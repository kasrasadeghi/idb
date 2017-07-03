import React, {Component} from 'react';

class ChampionList extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };

    fetch('http://leaguedb.me/api/items', {
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
        {this.state.list.map((item) => {
          return <div className="row">
            <div className="col-sm-4">
              <a href={"/item/" + item.name}>
                <figure> <figcaption>{item.name}</figcaption>
                  <img alt={item.name + "'s icon"} src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/item/" + item.icon}/>
                </figure>
              </a>
            </div>
          </div>
        })}
      </div>
    );
  }
}

export default ChampionList;
