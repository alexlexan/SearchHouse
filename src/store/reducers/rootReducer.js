import {combineReducers} from 'redux'
import bookingReducer from './booking'

export default combineReducers({
    booking: bookingReducer
})