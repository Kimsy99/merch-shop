const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  //action.type is string
  switch (action.type){
    case "SET_CURRENT_USER":
      return{
        ...state,
        currentUser: action.payload
      }
    default:
      return state; //if nothing match then get back current state
  }
};
