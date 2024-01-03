import React from 'react'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import ReduxStore from '../Redux/ReduxStore.js'; // Import the default export
import { ChakraProvider } from '@chakra-ui/react'
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ReduxStore.Store}>
      <PersistGate loading={null} persistor={ReduxStore.persistor}>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)