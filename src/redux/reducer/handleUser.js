// 定义 action types
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

// 定义 actions
export const loginSuccess = () => ({
  type: LOGIN_SUCCESS
});

export const logout = () => ({
  type: LOGOUT
});

// 定义 reducer
const initialState = {
  isLoggedIn: true
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    default:
      return state;
  }
};