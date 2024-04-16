import handleBookmark from './handleBookmark'
import handleJoinTicket from './handleJoinTicket'
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleBookmark,
    handleJoinTicket,
    handleUser: (state = null, action) => {
        switch (action.type) {
            case 'LOGIN':
                return action.payload
            case 'LOGOUT':
                return null
            default:
                return state
        }
    }
})

export default rootReducers