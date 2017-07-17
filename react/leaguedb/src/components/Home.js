import React, {Component} from 'react';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div className="row">
      <img src={"https://lolstatic-a.akamaihd.net/frontpage/apps/prod/artbook/en_US/f31d8b829b6" +
      "03b4b65fdff2475bd0803ced0179d/assets/content/summoners_rift/16_tenets/tenets_01.jpg"}
           className="center-block"
           style={{"float": "none", "background-color": "grey"}}/>
      </div>
    )
  }
}

export default Home;
