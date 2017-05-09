import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'

import api from './middlewares/api'
import reducers from './reducers'

export default function configureStore(initialState, history) {
  const middleware = [
    thunk,
    routerMiddleware(history),
    api,
  ]

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger())
  }

  const store = createStore(
    reducers,
    applyMiddleware(...middleware),
  )

  return store
}
