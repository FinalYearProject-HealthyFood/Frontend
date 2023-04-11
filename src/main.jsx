import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './contexts/ContextProvider'

const theme = extendTheme({
  colors: {
    brand: {
      50: "#C7E4D8",
      100: "#A5D1B7",
      200: "#80BD96",
      300: "#5CA874",
      400: "#488A5C",
      500: "#427F50",
      600: "#3B743F",
      700: "#325D32",
      800: "#284628",
      900: "#1E3620",
    },
    footer: {
      50: "#e0e4e2",
      100: "#c1cbc5",
      200: "#a2b5ae",
      300: "#839f97",
      400: "#657a7f",
      500: "#546658",
      600: "#47514d",
      700: "#393d41",
      800: "#2c2e2f",
      900: "#1e1f20",
    },
    certificate: {
      500: "#393939"
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ContextProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
