import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import * as Location from "expo-location";
import RNGooglePlaces from "react-native-google-places";
import request from "../../../Utilities/request";

//--------------------
//Constants
//--------------------
const {
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DISTANCE_MATRIX,
} = constants;

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//--------------------
//Actions
//--------------------
const verifyPermissions = async () => {
  const result = await Location.requestForegroundPermissionsAsync();
  if (result.status !== "granted") {
    Alert.alert(
      "Insufficient permissions!",
      "You need to grant location permissions to use this app.",
      [{ text: "Okay" }]
    );
    return false;
  }
  return true;
};

export const getCurrentLocation = () => async (dispatch) => {
  const hasPermission = await verifyPermissions();
  if (!hasPermission) {
    return;
  }

  try {
    const location = await Location.getCurrentPositionAsync({
      timeout: 5000,
    });
    dispatch({
      type: GET_CURRENT_LOCATION,
      payload: location,
    });
  } catch (err) {
    return Alert.alert(
      "Could not fetch location!",
      "Please try again later or pick a location on the map.",
      [{ text: "Okay" }]
    );
  }
};

//GET USER INPUT
export const getInputData = (payload) => {
  return {
    type: GET_INPUT,
    payload,
  };
};
//toggle search result modal
export const toggleSearchResultModal = (payload) => {
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload,
  };
};

//GET ADRESSES FROM GOOGLE PLACE
export function getAddressPredictions() {
  return (dispatch, store) => {
    let userInput = store().home.resultTypes.pickUp
      ? store().home.inputData.pickUp
      : store().home.inputData.dropOff;
    RNGooglePlaces.getAutocompletePredictions(userInput, {
      country: "MY",
    })
      .then((results) =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: results,
        })
      )
      .catch((error) => console.log(error.message));
  };
}

//GET SELECTED ADDRESS
export const getSelectedAddress = (payload) => {
  // const dummyNumbers ={
  // 	baseFare:0.4,
  // 	timeRate:0.14,
  // 	distanceRate:0.97,
  // 	surge:1
  // }
  return (dispatch, store) => {
    dispatch({
      type: GET_SELECTED_ADDRESS,
      payload,
    });

    //Get the distance and time
    request
      .get("https://maps.googleapis.com/maps/api/distancematrix/json")
      .query({
        origins:
          store().home.region.latitude + "," + store().home.region.longitude,
        destinations:
          store().home.selectedAddress.latitude +
          "," +
          store().home.selectedAddress.longitude,
        mode: "driving",
        key: "AIzaSyCNFJ91ksP57SweEz_mDgDXAewlJMlr2RI",
      })
      .finish((error, response) => {
        dispatch({
          type: GET_DISTANCE_MATRIX,
          payload: response.body,
        });
      })
      // 	setTimeout(function(){
      // 		if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
      // 			const fare = calculateFare(
      // 				dummyNumbers.baseFare,
      // 				dummyNumbers.timeRate,
      // 				store().home.distanceMatrix.rows[0].elements[0].duration.value,
      // 				dummyNumbers.distanceRate,
      // 				store().home.distanceMatrix.rows[0].elements[0].distance.value,
      // 				dummyNumbers.surge,
      // 			);
      // 			dispatch({
      // 				type:GET_FARE,
      // 				payload:fare
      // 			})
      // 		}

      // 	},2000)

      // })
      .catch((error) => console.log(error.message));
  };
};

//--------------------
//Action Handlers
//--------------------
const handleGetCurrentLocation = (state, action) =>
  update(state, {
    region: {
      latitude: {
        $set: action.payload.coords.latitude,
      },
      longitude: {
        $set: action.payload.coords.longitude,
      },
      latitudeDelta: {
        $set: LATITUDE_DELTA,
      },
      longitudeDelta: {
        $set: LONGITUDE_DELTA,
      },
    },
  });

const handleGetInputDate = (state, action) => {
  const { key, value } = action.payload;
  return update(state, {
    inputData: {
      [key]: {
        $set: value,
      },
    },
  });
};

const handleToggleSearchResult = (state, action) => {
  if (action.payload === "pickUp") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: true,
        },
        dropOff: {
          $set: false,
        },
      },
      predictions: {
        $set: {},
      },
    });
  }
  if (action.payload === "dropOff") {
    return update(state, {
      resultTypes: {
        pickUp: {
          $set: false,
        },
        dropOff: {
          $set: true,
        },
      },
      predictions: {
        $set: {},
      },
    });
  }
};

const handleGetAddressPredictions = (state, action) => {
  return update(state, {
    predictions: {
      $set: action.payload,
    },
  });
};

const handleGetSelectedAddress = (state, action) => {
  return update(state, {
    selectedAddress: {
      $set: action.payload,
    },
  });
};

const handleGetDitanceMatrix = (state, action) => {
  return update(state, {
    distanceMatrix: {
      $set: action.payload,
    },
  });
};

const ACTION_HANDLERS = {
  GET_CURRENT_LOCATION: handleGetCurrentLocation,
  GET_INPUT: handleGetInputDate,
  TOGGLE_SEARCH_RESULT: handleToggleSearchResult,
  GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
  GET_SELECTED_ADDRESS: handleGetSelectedAddress,
  GET_DISTANCE_MATRIX: handleGetDitanceMatrix,
};

const initialState = {
  region: {},
  inputData: {},
  resultTypes: {},
  selectedAddress: {},
};

export const HomeReducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
};
