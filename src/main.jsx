import React from 'react'
import ReactDOM from 'react-dom/client'
import HomePage from './home-page.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react';
import {theme} from './consts';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <HomePage/> 
    </ChakraProvider>
  </React.StrictMode>,
)
