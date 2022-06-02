import React, { useEffect } from "react"
import styles from './Converter.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getRates } from '../../actions/rates'
import { currencies } from "../../lib/Keeper"
import { setCurrencyTypeTo, setCurrencyTypeFrom, setConvertedValue, setMultiplexer, setValue } from '../../reducers/converterReducer'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import {currenciesPairs} from "../../lib/Keeper"

export const Converter = () => {
    const dispatch = useDispatch()
    const rates = useSelector(state => state.response.rates)
    const isFetchError = useSelector(state => state.response.isFetchError)
    const currencyTypeFrom = useSelector(state => state.converter.currencyTypeFrom)
    const currencyTypeTo = useSelector(state => state.converter.currencyTypeTo)
    const value = useSelector(state => state.converter.value)
    const convertedValue = useSelector(state => state.converter.convertedValue)
    const multiplexer = useSelector(state => state.converter.multiplexer)

    useEffect(() => {
        console.log('do request')
        dispatch(getRates(currencyTypeFrom, currencyTypeTo, value))
        console.log(currencyTypeFrom)
    }, [currencyTypeFrom])

    useEffect(() => {
        let result = value * multiplexer
        dispatch(setConvertedValue(result))
    }, [currencyTypeFrom, currencyTypeTo])

    const selectChangeFrom = (event) => {
        console.log('from currency set to', event.target.value)
        dispatch(setCurrencyTypeFrom(event.target.value))
    }

    const selectChangeTo = (event) => {
        console.log("in currency set to", event.target.value)
        dispatch(setCurrencyTypeTo(event.target.value))
        let mult = rates[event.target.value]
        dispatch(setMultiplexer(mult))
    }

    const handleInputChangeFrom = (event) => {
        let mult = rates[currencyTypeTo]
        let resultMult = event.target.value * mult
        let resultDiv = event.target.value / mult
        console.log(event.target.name)
        switch (event.target.name) {
            case 'from':
                dispatch(setValue(event.target.value))
                dispatch(setConvertedValue(resultMult))
                break
            case 'in':
                dispatch(setValue(resultDiv))
                dispatch(setConvertedValue(event.target.value))
                break
            default:
                break
        }
    }

    return (
        <div className={styles.converter}>

            {isFetchError &&
                <div class={styles.errorMess} role="alert">
                    Произошла ошибка! Обновите страницу!!!
                </div>}

            <div className={styles.converter_side}>

                <Box sx={{ minWidth: 150 }} className={styles.switcher}>
                    <FormControl  >
                        <InputLabel id="demo-simple-select-label">Меняем</InputLabel>
                        <Select  sx={{ width: 250 }} labelId="demo-simple-select-label" id="demo-simple-select" value={currencyTypeFrom} label="Currency" onChange={selectChangeFrom}>
                            {currencies.map((type, index) => (
                                    type === currencyTypeFrom ? <MenuItem key={index} value={currencyTypeFrom}>{currenciesPairs[currencyTypeFrom]} ({currencyTypeFrom})</MenuItem> : <MenuItem key={index} value={type}>{currenciesPairs[type]} ({type})</MenuItem>
                                ))}

                                
                        </Select>
                    </FormControl>
                </Box>

                <Box className={styles.input}
                    noValidate
                    autoComplete="off"
                >
                    <TextField sx={{width: 250}} label={currencyTypeFrom} value={value} name="from" autoComplete="off" variant="outlined" onFocus={event => {event.target.select()}} onChange={handleInputChangeFrom} />
                </Box>
            </div>

            <div className={styles.converter_side}>
                <Box sx={{ minWidth: 150 }} className={styles.switcher}>
                    <FormControl >
                        <InputLabel id="demo-simple-select-label">Получаем</InputLabel>
                        <Select  sx={{ width: 250 }} labelId="demo-simple-select-label" id="demo-simple-select" value={currencyTypeTo} label="Currency" onChange={selectChangeTo}>
                            {currencies.map((type, index) => (
                                    type === currencyTypeTo ? <MenuItem key={index} value={currencyTypeTo}>{currenciesPairs[currencyTypeTo]} ({currencyTypeTo})</MenuItem> : <MenuItem key={index} value={type}>{currenciesPairs[type]} ({type})</MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box  className={styles.input}
                    noValidate
                    autoComplete="off"
                >
                    <TextField sx={{width: 250}} name="in" label={currencyTypeTo} value={convertedValue} variant="outlined" onFocus={event => {event.target.select()}} onChange={handleInputChangeFrom} />
                </Box>
            </div>
        </div>
    )
}