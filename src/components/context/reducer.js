const Reducer =(state,action)=>{
    switch (action.type) {
        case "UPDATE_USER_DETAILS":
            const user_details = {
                ...state.user_details,
                ...action.user_details,
            };
            localStorage.setItem("user_details", JSON.stringify(user_details));
            return {
                ...state,
                user_details: { ...state.user_details, ...action.user_details },
            };
    
        default:
            return state;
    }
}

export default Reducer