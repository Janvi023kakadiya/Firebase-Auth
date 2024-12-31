
const initialState = {
    user: null,
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'auth/setUser ':
        return {
          ...state,
          user: action.payload, 
        };
      default:
        return state;
    }
  };
  
  export default authReducer;