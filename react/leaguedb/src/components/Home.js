import React, {Component} from 'react';
import './Home.css'

class Home extends Component {
  render() {
    return (
      <div style={{"background-image":"url(\"https://lolstatic-a.akamaihd.net/frontpage/apps/prod/artbook/en_US/f31d8b829b603b4b65fdff2475bd0803ced0179d/assets/content/summoners_rift/16_tenets/tenets_01.jpg\")"}}
           className="name-content text-center"/>
    )
  }
}

export default Home;
