const jointicket = []

const handleJoinTicket = (state=jointicket, action) =>{
    const ticket = action.payload
    switch(action.type){
        case "ADDJOINTICKET":
            // Check if ticket already in jointicket
            const exist = state.find((x) => x.id === ticket.id)
            if(exist){
                // Increase the quantity
                return state.map((x)=>x.id ===ticket.id?{...x, qty: x.qty+1}:x)
            }
            else{
                return [...state, {...ticket, qty:1}]
            }
            break;
        case "DELJOINTICKET":
            const exist2 = state.find((x) => x.id === ticket.id)
            if(exist2.qty === 1){
                return state.filter((x)=>x.id!==exist2.id)
            }
            else{
                return state.map((x)=> x.id===ticket.id?{...x, qty:x.qty-1}:x)
            }
            break;

        default:
            return state
            break;
    }
}

export default handleJoinTicket