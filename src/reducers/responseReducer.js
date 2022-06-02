const SET_RATES = "SET_RATES";
const SET_IS_FETCHING = "SET_IS_FETCHING";
const SET_FETCH_ERROR = "SET_FETCH_ERROR";

const defaultState = {
  full_data: [],
  rates: [],
  isFetching: true,
  isFetchError: false,
};

export default function responseReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_RATES:
      return {
        ...state,
        rates: action.payload.conversion_rates,
        isFetching: false,
        full_data: action.payload,
      };
    case SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload,
      };
    case SET_FETCH_ERROR:
      return {
        ...state,
        isFetchError: action.payload,
      };
    default:
      return state;
  }
}

export const setRates = (rates) => ({ type: SET_RATES, payload: rates });
export const setIsFetching = (bool) => ({
  type: SET_IS_FETCHING,
  payload: bool,
});
export const setFetchError = (bool) => ({
  type: SET_FETCH_ERROR,
  payload: bool,
});