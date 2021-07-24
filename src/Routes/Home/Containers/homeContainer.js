import { connect } from "react-redux";
import Home from "../Components/home";
import { getCurrentLocation, getSelectedAddressAndFare } from "../Modules/home";

const mapStateToProps = (state) => ({
  region: state.home.region,
  fare: state.home.fare,
  // selectedAddress: state.home.selectedAddress || {},
});

const mapActionCreaters = {
  getCurrentLocation,
  getSelectedAddressAndFare,
};

export default connect(mapStateToProps, mapActionCreaters)(Home);
