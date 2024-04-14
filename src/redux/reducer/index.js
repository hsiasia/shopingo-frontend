import handleBookmark from './handleBookmark'
import handleJoinTicket from './handleJoinTicket'
import { combineReducers } from "redux";
const rootReducers = combineReducers({
    handleBookmark,
    handleJoinTicket,
})

export default rootReducers