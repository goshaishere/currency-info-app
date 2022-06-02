import axios from 'axios'
import {setIsFetching, setRates, setFetchError} from "../reducers/responseReducer"
import {setMultiplexer, setConvertedValue} from '../reducers/converterReducer'
const API_KEY = "200f439a00e1477534fd4618"

export const getRates = (currencyTypeFrom, currencyTypeTo, value) => {

    return async (dispatch) => {
        try {
            dispatch(setIsFetching(true))
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyTypeFrom}`)
            dispatch(setRates(response.data))
            dispatch(setMultiplexer(response.data.conversion_rates[currencyTypeTo]))
            dispatch(setConvertedValue(response.data.conversion_rates[currencyTypeTo] * value))
        } catch (e) {
            dispatch(setFetchError(true))
            dispatch(setIsFetching(false))

            setTimeout( () => {
                dispatch(setFetchError(false))
            }, 2000)
        }
    }
}