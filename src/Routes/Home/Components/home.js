import React from "react";
import { Container } from "native-base";

import MapContainer from "./MapContainer/index";
import HeaderComponent from "../../../Components/HeaderComponent/index";
import FooterComponent from "../../../Components/FooterComponent/index";
import Fare from "./Fare/index";
const taxiLogo = require("../../../Assets/Images/taxi_logo_white.png");

class Home extends React.Component {
  componentDidMount() {
    this.props.getCurrentLocation();
  }

  render() {
    // const region = {
    //   latitude: 24.8607,
    //   longitude: 67.0011,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // };

    return (
      <Container>
        <HeaderComponent logo={taxiLogo} />
        {this.props.region && (
          <MapContainer
            region={this.props.region}
            getSelectedAddressAndFare={this.props.getSelectedAddressAndFare}
            selectedAddress={this.props.selectedAddress}
          />
        )}
        {this.props.fare && <Fare fare={this.props.fare} />}
        <FooterComponent />
      </Container>
    );
  }
}

export default Home;
