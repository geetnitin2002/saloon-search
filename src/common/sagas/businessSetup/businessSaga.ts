// @ts-ignore
import { BusinessSetup } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  addBusinessMain,
  addBusinessAddress,
  addBusinessHours,
  addBusinessSettings,
  addBusinessExtraInfo,
  addBusinessHolidays,
  addBusinessService,
  addBusinessStaff,
  deleteBusinessService,
  deleteBusinessStaff,
  getBusinessStaff,
  getBusinessService,
  getBusinessAddressInfo,
  getBusinessMainInfo,
  getBusinessExtraInfo,
  bookTicket,
  getBusinessWorkingHourSlots,
  getBusinessWeekRange,
  getTicketsAvailability,
  getBusinessWeek,
  getBusinessSkillStaff,
  getBusinessDetails,
  getBusinessByBehaviorDetails,
} from "../../api/businessApi";

// const temp_response = { id: 55 };
// const error = [
//   {
//     field: "Business Name",
//     message: "A business with this name already exists"
//   },
//   {
//     field: "email",
//     message: "Email already exists"
//   }
// ];
// const error1 = {
//   description: "description is incoreect"
// };
const error3 = "something went wrong";
export function* addBusinessSaga() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD, addBusiness);
}

function* addBusiness(action: any) {
  let response = yield call(addBusinessMain, action.body);
  // response.errors = error;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_RESPONSE,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* getBusiness() {
  yield takeLatest(BusinessSetup.BUSINESS_GET, getBusinessInfo);
}
function* getBusinessInfo(action: any) {
  let response = yield call(getBusinessDetails, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_RES,
      payload: response.data,
    });
  }
}
export function* getBusinessbyBehavior() {
  yield takeLatest("BUSINESS_BY_BEHAVIOR_GET", getBusinessByBehaviorInfo);
}
function* getBusinessByBehaviorInfo(action: any) {
  let response = yield call(getBusinessByBehaviorDetails, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "BUSINESS_BY_BEHAVIOR_GET_RES",
      payload: response.data,
    });
  }
}

export function* addBusinessAddres() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS, businessAddress);
}
function* businessAddress(action: any) {
  let response = yield call(addBusinessAddress, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* getBusinessAddres() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS,
    getBusinessAddress
  );
}
function* getBusinessAddress(action: any) {
  let response = yield call(getBusinessAddressInfo, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessExtraInf() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_EXTRA_FIELDS,
    getBusinessExtraInfos
  );
}
function* getBusinessExtraInfos(action: any) {
  let response = yield call(getBusinessExtraInfo, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_EXTRA_FIELDS_RES,
      payload: response.data,
    });
  }
}

export function* addBusinessHourss() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_HOUR_FIELDS, addBusinessHour);
}
function* addBusinessHour(action: any) {
  let response = yield call(addBusinessHours, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_HOUR_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* addBusinessExtaInfos() {
  yield takeLatest(
    BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS,
    addBusinessExtraInfos
  );
}
function* addBusinessExtraInfos(action: any) {
  let response = yield call(addBusinessExtraInfo, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* addNewBusinessSettings() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_SETTINGS, addBusinessSettingss);
}
function* addBusinessSettingss(action: any) {
  let response = yield call(addBusinessSettings, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_SETTINGS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* addNewBusinessHoliday() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_HOLIDAYS, addNewBusinessHolidays);
}
function* addNewBusinessHolidays(action: any) {
  let response = yield call(addBusinessHolidays, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_HOLIDAYS_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* addNewBusinessServices() {
  yield takeLatest(
    BusinessSetup.BUSINESS_ADD_SERVICES,
    addNewBusinessServicess
  );
}
function* addNewBusinessServicess(action: any) {
  let response = yield call(addBusinessService, action.id, action.body);
  //  response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_SERVICES_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* deleteNewBusinessServices() {
  yield takeLatest(
    BusinessSetup.BUSINESS_DELETE_SERVICES,
    deleteBusinessServicess
  );
}
function* deleteBusinessServicess(action: any) {
  let response = yield call(deleteBusinessService, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_DELETE_SERVICES_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* addNewBusinessStaff() {
  yield takeLatest(BusinessSetup.BUSINESS_ADD_STAFF, addBusinessStaffs);
}
function* addBusinessStaffs(action: any) {
  let response = yield call(addBusinessStaff, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_ADD_STAFF_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* deleteNewBusinessStaff() {
  yield takeLatest(BusinessSetup.BUSINESS_DELETE_STAFF, deleteBusinessStaffs);
}
export function* getBusinessstaff() {
  yield takeLatest(BusinessSetup.BUSINESS_GET_LIST_STAFF, getBusinessStaffs);
}
function* getBusinessStaffs(action: any) {
  const response = yield call(getBusinessStaff, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_LIST_STAFF_RES,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}
export function* getBusinesService() {
  yield takeLatest(
    BusinessSetup.BUSINESS_GET_LIST_SERVICES,
    getBusinessServicess
  );
}
function* getBusinessServicess(action: any) {
  const response = yield call(getBusinessService, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_GET_LIST_SERVICES_RES,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* getBusinesWeek() {
  yield takeLatest("BOOKING_GET_WEEK", getBusinesWeeks);
}
function* getBusinesWeeks(action: any) {
  const response = yield call(getBusinessWeek, action.id);
  if (response && !response.errors) {
    yield put({
      type: "BOOKING_GET_WEEK_RES",
      payload: response.data,
    });
  } else {
    yield put({
      type: "BOOKING_GET_WEEK_RES_ERROR",
      payload: response && response.errors,
    });
  }
}
function* deleteBusinessStaffs(action: any) {
  let response = yield call(deleteBusinessStaff, action.id, action.body);
  // response = temp_response;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_DELETE_STAFF_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.BUSINESS_ERROR_RESPONSE,
      payload: response && response.errors,
    });
  }
}

export function* bookTicketSaga() {
  yield takeLatest(BusinessSetup.TICKET_BOOKING_REQ, ticketBooking);
}

function* ticketBooking(action: any) {
  let response = yield call(bookTicket, action.id, action.body);
  // response.errors = error;
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.TICKET_BOOKING_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.TICKET_BOOKING_RES,
      payload: response && response,
    });
  }
}
export function* getTicketsAvailable() {
  yield takeLatest(BusinessSetup.GET_TICKETS_AVAILABILITY, ticketAvailable);
}

function* ticketAvailable(action: any) {
  let response = yield call(getTicketsAvailability, action.id, action.name);
  // response.errors = error;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.GET_TICKETS_AVAILABILITY_RES,
      payload: response.data,
    });
  }
}
export function* getBusinessWorkingHours() {
  yield takeLatest(
    BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS,
    getBusinessWorkingHour
  );
}

function* getBusinessWorkingHour(action: any) {
  let response = yield call(getBusinessWorkingHourSlots, action.id);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessPerWeekRange() {
  yield takeLatest(BusinessSetup.BUSINESS_wEEK_RANGE, getBusinessWeekRang);
}

function* getBusinessWeekRang(action: any) {
  let response = yield call(getBusinessWeekRange, action.id);
  // response.errors = error;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.BUSINESS_wEEK_RANGE_RES,
      payload: response,
    });
  }
}
export function* getBusinessSkillstaff() {
  yield takeLatest("BUSINESS_GET_LIST_SKILL_STAFF", getBusinessSkillStaffs);
}
function* getBusinessSkillStaffs(action: any) {
  const response = yield call(getBusinessSkillStaff, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "BUSINESS_GET_LIST_SKILL_STAFF_RES",
      payload: response.data,
    });
  }
}
