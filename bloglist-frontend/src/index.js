import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './configStore'

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(<ReduxApp />, document.getElementById('root'))
