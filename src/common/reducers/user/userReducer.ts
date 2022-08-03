// @ts-ignore
import { USERProfile } from "custom-actions";

/**
 * @description - Switch cases for the dispatched User Actions.
 *
 * @param state - State of the store.
 * @param action - Dispatched action.
 */
const userReducer = (
  state = {
    loginResponse: null,
    resetPasswordResponse: null,
    passwordResetSuccess: false
  },
  action: { type: USERProfile; payload?: any }
) => {
  switch (action.type) {
    case USERProfile.USER_LOGIN_RESPONSE:
      return {
        ...state,
        loginResponse: action.payload
      };
    case USERProfile.VERIFY_EMAIL_RESPONSE:
      return {
        ...state,
        resetPasswordResponse: action.payload
      };
    case USERProfile.VERFY_SECURITY_QUESTION_RESPONSE:
      return {
        ...state,
        resetPasswordResponse: action.payload
      };
    case USERProfile.RESET_PASSWORD_RESPONSE:
      return {
        ...state,
        passwordResetSuccess: true
      };
    default:
      return state;
  }
};

export default userReducer;
