import { connect } from "react-redux";
import Home from "../Components/home";
import { getCurrentLocation } from "../Modules/home";

const mapStateToProps = (state) => ({
  region: state.home.region,
});

const mapActionCreaters = {
  getCurrentLocation,
};

export default connect(mapStateToProps, mapActionCreaters)(Home);
