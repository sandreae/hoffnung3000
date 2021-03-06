import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import api from './middlewares/api'
import apiError from './middlewares/apiError'
import flash from './middlewares/flash'
import formErrorFlash from './middlewares/formErrorFlash'
import redirect from './middlewares/redirect'
import reducers from './reducers'
import scroll from './middlewares/scroll'
import userStatus from './middlewares/userStatus'

let store

export default function configureStore(initialState, history) {
  const middleware = [
    thunk,
    routerMiddleware(history),
    flash,
    redirect,
    api,
    userStatus,
    apiError,
    formErrorFlash,
    scroll,
  ]

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
  }

  store = createStore(
    reducers(history),
    applyMiddleware(...middleware),
  )

  return store
}

export function getStore() {
  return store
}
