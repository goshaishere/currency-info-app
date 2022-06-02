import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getRates } from '../../actions/rates'
import styles from './Rates.module.scss'
import { currencies } from "../../lib/Keeper"
import { currenciesObj } from "../../lib/Keeper"
import { setCurrencyType } from '../../reducers/exchangeRatesReducer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {currenciesPairs} from "../../lib/Keeper"

function createData(name, code, rate) {
    return { name, code, rate };
}

function dataGen(rates) {
    const rows = [
        createData('Российский рубль', "RUB", rates["RUB"]),
        createData('Доллар США', "USD", rates["USD"]),
        createData('Евро', "EUR", rates["EUR"]),
        createData('Британский фунт', "GBP", rates["GBP"]),
        createData('Казахстанский тенге', "KZT", rates["KZT"]),
        createData('Японская иена', "JPY", rates["JPY"]),
        createData('Китайский юань', "CNY", rates["CNY"]),
        createData('Южнокорейская вона', "KRW", rates["KRW"]),
        createData('Турецкая лира', "TRY", rates["TRY"]),
        createData('Грузинский лари', "GEL", rates["GEL"]),
    ];

    return rows
}

export const Rates = () => {
    const dispatch = useDispatch()
    const rates = useSelector(state => state.response.rates)
    const currencyType = useSelector(state => state.rates.currencyType)
    let rows = dataGen(rates)
    const isFetchError = useSelector(state => state.response.isFetchError)

    useEffect(() => {
        console.log(currenciesObj)
        console.log('do request')
        dispatch(getRates(currencyType))
    }, [currencyType])

    const selectChangeFrom = (event) => {
        dispatch(setCurrencyType(event.target.value))
    }

    return (
        <div className={styles.rates}>

            {isFetchError &&
                <div class={styles.errorMess} role="alert">
                    Произошла ошибка! Обновите страницу!!!
                </div>}

            <Box  sx={{ minWidth: 280, maxWidth: 600}}>

                <FormControl className={styles.switcher} fullWidth>
                    <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                    <Select  labelId="demo-simple-select-label" id="demo-simple-select" value={currencyType} label="Currency" onChange={selectChangeFrom}>
                        {
                            currencies.map((type, index) => (
                                type === currencyType ? <MenuItem key={index} value={currencyType}>{currenciesPairs[currencyType]} ({currencyType})</MenuItem> : <MenuItem key={index} value={type}>{currenciesPairs[type]} ({type})</MenuItem>
                            ))}
                    </Select>
                </FormControl>
            
                <TableContainer className={styles.table} component={Paper}>
                    <Table sx={{ minWidth: 280 }} aria-label="simple table">
                        <TableHead color="secondary">
                            <TableRow>
                                <TableCell align="left">Название валюты</TableCell>
                                <TableCell align="center">Международный код</TableCell>
                                <TableCell align="right">Обменный коэффициент</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
                                    <TableCell align="center">{row.code}</TableCell>
                                    <TableCell align="right">{row.rate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    )
}