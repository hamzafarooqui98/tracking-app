import React from "react";
import { Container } from "native-base";

import MapContainer from "./MapContainer/index";

class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }

  render() {
    const region = {
      latitude: 24.8607,
      longitude: 67.0011,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return (
      <Container>
        {this.props.region && <MapContainer region={this.props.region} />}
      </Container>
    );
  }
}

export default Home;
