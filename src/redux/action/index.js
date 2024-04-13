// For Add Ticket to Bookmark
export const addBookmark = (ticket) =>{
    return {
        type:"ADDTICKET",
        payload:ticket
    }
}

// For Delete Ticket to Bookmark
export const delBookmark = (ticket) =>{
    return {
        type:"DELTICKET",
        payload:ticket
    }
}

// For Add Ticket to JoinTicket
export const addJoinTicket = (ticket) =>{
    return {
        type:"ADDJOINTICKET",
        payload:ticket
    }
}

// For Delete Ticket to JoinTicket
export const delJoinTicket = (ticket) =>{
    return {
        type:"DELJOINTICKET",
        payload:ticket
    }
}