import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App'
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './i18n';
import { render } from 'react-dom'
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert' // https://www.npmjs.com/package/react-alert
//import AlertTemplate from 'react-alert-template-basic'

const AlertTemplate = ({ style, options, message, close, containerStyle }) => (
  <div style={style} className="">
    {/* {options.type === 'info' && '!'}
    {options.type === 'success' && ':)'}
    {options.type === 'error' && ':('} */}
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <strong className="font-bold">ERROR! </strong>
      <span className="block sm:inline">
        {message}
      </span>
  </div>
  </div>
)

const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 6500,
  offset: '5px',
  // you can also just use 'scale'
  transition: transitions.FADE,
  type: 'error',
  containerStyle: {
    zIndex: 1200
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <AlertProvider template={AlertTemplate} {...options}>
            <App />
          </AlertProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
