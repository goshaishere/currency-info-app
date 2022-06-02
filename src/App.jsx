import React from "react"
import { Route, Routes } from "react-router-dom"
import { Layout } from './components/layouts/Layout'
import { Converter } from './pages/converterPage/Converter'
import { Rates } from './pages/exchangeRatesPage/Rates'
import { NotFound } from './pages/404page/404'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const myTheme = createTheme({
  palette: {
    primary: {
      main: "#3EA136"
    },
  },
});

function App() {
  return (
    <div className="App">


      <ThemeProvider theme={myTheme}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Converter />} />
            <Route path="rates" element={<Rates />} />
          </ Route >
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>


    </div>
  );
}

export default App;