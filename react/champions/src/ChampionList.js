import React, {Component} from 'react';

class ChampionList extends Component {
  constructor() {
    super();

    this.state = {
      list: []
    };

    fetch('http://leaguedb.me/api/champions', {
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
        {this.state.list.map((champion) => {
          return <div className="row">
              <div className="col-sm-4">
                <a href={"/champions/" + champion.name}>
                  <figure> <figcaption>{champion.name}</figcaption>
                    <img alt={champion.name + "'s icon"} src={"https://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + champion.icon}/>
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
