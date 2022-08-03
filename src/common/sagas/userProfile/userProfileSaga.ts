// @ts-ignore
import { USERProfile } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  userLoginApi,
  verifyEmailApi,
  verifySeucrityQuestionApi,
  resetpasswordAPi
} from "../../api/userApi";
export function* userProfileSaga() {
  yield takeLatest(USERProfile.USER_PROFILE, userProfile);
}

function* userProfile() {
  // const userProfileData = yield call(userProfileDetail);
  yield put({
    type: USERProfile.USER_PROFILE_RESPONSE,
    payload: { id: 1 }
  });
}

export function* userLogin() {
  yield takeLatest(USERProfile.USER_LOGIN, userlogin);
}
function* userlogin(action: any) {
  let response = yield call(userLoginApi, action.body);
  response = { user: "aashwini", userId: 1 };
  if (response && !response.error) {
    yield put({
      type: USERProfile.USER_LOGIN_RESPONSE,
      payload: response
    });
  }
}

export function* userVerifyEmail() {
  yield takeLatest(USERProfile.VERIFY_EMAIL, verifyEmail);
}
function* verifyEmail(action: any) {
  let response = yield call(verifyEmailApi, action.body);
  response = { user: "aashwini", userId: 1 };
  if (response && !response.error) {
    yield put({
      type: USERProfile.VERIFY_EMAIL_RESPONSE,
      payload: { ...response, step: action.step + 1 }
    });
  }
}

export function* userVerifySecurityQuestion() {
  yield takeLatest(USERProfile.VERFY_SECURITY_QUESTION, verifySecurityQuestion);
}
function* verifySecurityQuestion(action: any) {
  let response = yield call(verifySeucrityQuestionApi, action.body, action.id);
  response = { user: "aashwini", userId: 1 };
  if (response && !response.error) {
    yield put({
      type: USERProfile.VERFY_SECURITY_QUESTION_RESPONSE,
      payload: { ...response, step: action.step + 1 }
    });
  }
}

export function* userResetPassword() {
  yield takeLatest(USERProfile.RESET_PASSWORD, resetPassword);
}
function* resetPassword(action: any) {
  let response = yield call(resetpasswordAPi, action.body);
  response = { user: "aashwini", userId: 1 };
  if (response && !response.error) {
    yield put({
      type: USERProfile.RESET_PASSWORD_RESPONSE,
      payload: { ...response, step: action.step }
    });
  }
}
