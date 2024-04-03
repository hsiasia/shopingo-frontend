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