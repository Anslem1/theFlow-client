import React, { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './Redux/store/index'
import { BrowserRouter } from 'react-router-dom'

window.store = store

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
)
