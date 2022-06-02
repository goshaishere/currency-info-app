const SET_CURRECY_TYPE_TO = "SET_CURRECY_TYPE_TO";
const SET_CURRECY_TYPE_FROM = "SET_CURRECY_TYPE_FROM";
const SET_CONVERTED_VALUE = "SET_CONVERTED_VALUE";
const SET_MULTIPLEXER = "SET_MULTIPLEXER"
const SET_VALUE = "SET_VALUE"
const initTypeFrom = "EUR";
const initTypeTo = "CNY";

const defaultState = {
  currencyTypeFrom: initTypeFrom,
  currencyTypeTo: initTypeTo,
  value: 0,
  convertedValue: 0,
  multiplexer: 0
};

export default function converterReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRECY_TYPE_TO:
      return {
        ...state,
        currencyTypeTo: action.payload,
      };
    case SET_CURRECY_TYPE_FROM:
      return {
        ...state,
        currencyTypeFrom: action.payload,
      };
    case SET_CONVERTED_VALUE:
      return {
        ...state,
        convertedValue: action.payload,
      };
      case SET_MULTIPLEXER:
        return {
          ...state,
          multiplexer: action.payload,
        };
      case SET_VALUE:
        return {
          ...state,
          value: action.payload,
        };
    default:
      return state;
  }
}

export const setCurrencyTypeTo = (newValue) => ({
  type: SET_CURRECY_TYPE_TO,
  payload: newValue,
});

export const setCurrencyTypeFrom = (newValue) => ({
  type: SET_CURRECY_TYPE_FROM,
  payload: newValue,
});

export const setConvertedValue = (newValue) => ({
  type: SET_CONVERTED_VALUE,
  payload: newValue,
});



export const setMultiplexer = (newValue) => ({
  type: SET_MULTIPLEXER,
  payload: newValue,
});


export const setValue = (newValue) => ({
  type: SET_VALUE,
  payload: newValue,
});
