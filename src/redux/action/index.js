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

// For Fetch Bookmark Data
const apiUrl = process.env.REACT_APP_API_URL;
export const fetchBookmarkData = () => {
    return (dispatch) => {
      fetch(`${apiUrl}/api/saveEvent/?user_id=${localStorage.getItem('user_id')}&status=saved`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch bookmark data');
          }
          return response.json();
        })
        .then(data => {
          dispatch({ type: 'INIT_BOOKMARK', payload: data.data });
        })
        .catch(error => {
          console.error('Error fetching bookmark data:', error);
        });
    };
  };

// For Fetch JoinTicket Data
export const fetchJoinTicketData = () => {
    return (dispatch) => {
      fetch(`${apiUrl}/api/userEvent?user_id=${localStorage.getItem('user_id')}&status=ongoing`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch jointicket data');
          }
          return response.json();
        })
        .then(data => {
          dispatch({ type: 'INIT_JOINTICKET', payload: data.data });
        })
        .catch(error => {
          console.error('Error fetching jointicket data:', error);
        });
    };
  };
  