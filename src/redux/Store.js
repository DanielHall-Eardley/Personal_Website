import {applyMiddleware, combineReducers, createStore} from "redux"
import logger from "redux-logger"
import animationReducer from "./reducers/AnimationReducer"
import toggleReducer from "./reducers/ToggleReducer"
import loginReducer from "./reducers/LoginReducer"

const rootReducer = combineReducers({
 animationReducer,
 toggleReducer,
 loginReducer,
})

const store = createStore(rootReducer, applyMiddleware(logger))

export default store