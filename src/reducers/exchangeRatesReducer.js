const SET_CURRENCY_TYPE = "SET_CURRENCY_TYPE";

const initType = "EUR";

const defaultState = {
  currencyType: initType,
};

export default function exchangeRatesReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_CURRENCY_TYPE:
      return {
        ...state,
        currencyType: action.payload
      };
    default:
      return state;
  }
}

export const setCurrencyType = (newType) => ({
  type: SET_CURRENCY_TYPE,
  payload: newType,
});