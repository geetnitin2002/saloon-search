// @ts-ignore
import { BusinessSetup } from "custom-actions";
import { put, takeLatest, call } from "redux-saga/effects";
import {
  serviceCategoriessAndBusinesses,
  getBusinessLocationList,
  SearchCategoriessAndBusinesses,
  userBooking,
  userBookingNoShow,
  userBookingCancel,
  getReassignmentData,
  applyReassignment,
  staffUserBooking,
  getStaffAvailability,
  bookAppointment,
} from "../../api/businessApi";
export function* getServiceCategoriessAndBusinesses() {
  yield takeLatest(
    BusinessSetup.GET_BUSINESS_SERVICES_COMBINED,
    getServiceCategoriessAndBusiness
  );
}
function* getServiceCategoriessAndBusiness() {
  let response = yield call(serviceCategoriessAndBusinesses);
  //let response = data;
  if (response) {
    yield put({
      type: BusinessSetup.GET_BUSINESS_SERVICES_COMBINED_RES,
      payload: response.data,
    });
  }
}

export function* getBusinessLocation() {
  yield takeLatest(BusinessSetup.GET_BUSINESS_LOCATIONS, getBusinessLocations);
}
function* getBusinessLocations() {
  let response = yield call(getBusinessLocationList);
  if (response) {
    yield put({
      type: BusinessSetup.GET_BUSINESS_LOCATIONS_RES,
      payload: response.data,
    });
  }
}
export function* SearchForCategoriessAndBusinesses() {
  yield takeLatest(
    BusinessSetup.SEARCH_BUSINESS,
    SearchForCategoriessAndBusiness
  );
}
function* SearchForCategoriessAndBusiness(action: any) {
  const response = yield call(SearchCategoriessAndBusinesses, action.body);
  // let response:any={
  //   data:''
  // }
  // response.data = [
  //   {
  //     businessId: 35,
  //     businessName: "Best Haircuts",
  //     services: [
  //       { name: "Mens Haircut", price: 100, duration: 2000 ,service:true},
  //       { name: "Mens Haircut", price: 100, duration: 2000 },
  //       { name: "Mens Haircut", price: 100, duration: 2000 },
  //       { name: "Mens Haircut", price: 100, duration: 2000 }
  //     ]
  //   }
  // ];
  if (response) {
    yield put({
      type: BusinessSetup.SEARCH_BUSINESS_RES,
      payload: response.data,
    });
  }
}

export function* userBookingREq() {
  yield takeLatest(BusinessSetup.MANAGER_USER_BOOKING_REQ, getUserBooking);
}
function* getUserBooking(action: any) {
  let response = yield call(userBooking, action.id, action.body);
  // const response: any = dataList;
  if (response && !response.errors && !response.error) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_RES,
      payload: response.data,
    });
  }
}

export function* staffuserBookingREq() {
  yield takeLatest(BusinessSetup.STAFF_USER_BOOKING_REQ, staffgetUserBooking);
}
function* staffgetUserBooking(action: any) {
  let response = yield call(staffUserBooking, action.id, action.body);
  // const response: any = dataList;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_RES,
      payload: response.data,
    });
  }
}

export function* userBookingREqnoShow() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_REQ,
    UserBookingnoShow
  );
}
function* UserBookingnoShow(action: any) {
  let response = yield call(userBookingNoShow, action.id, action.body);
  response = true;
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_NOSHOW_RES,
      payload: { error: "something went wrong" },
    });
  }
}
export function* staffUserBookingREqnoShow() {
  yield takeLatest(
    BusinessSetup.STAFF_USER_BOOKING_NOSHOW_REQ,
    staffUserBookingnoShow
  );
}
function* staffUserBookingnoShow(action: any) {
  let response = yield call(userBookingNoShow, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_NOSHOW_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.STAFF_USER_BOOKING_NOSHOW_RES,
      payload: { error: "something went wrong" },
    });
  }
}
export function* userBookingREqCancel() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_CANCEl_REQ,
    UserBookingCancel
  );
}
function* UserBookingCancel(action: any) {
  let response = yield call(userBookingCancel, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_CANCEl_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_CANCEl_RES,
      payload: { error: "something went wrong" },
    });
  }
}
export function* usergetReassignmentData() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_REQ,
    UsergetReassignmentData
  );
}
function* UsergetReassignmentData(action: any) {
  let response = yield call(getReassignmentData, action.id, action.bookingId);
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_RES,
      payload: response.data,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_RES,
      payload: { error: "something went wrong" },
    });
  }
}
export function* userapplyReassignment() {
  yield takeLatest(
    BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_REQ,
    UserapplyReassignment
  );
}
function* UserapplyReassignment(action: any) {
  let response = yield call(
    applyReassignment,
    action.id,
    action.bookingId,
    action.body
  );
  if (response && !response.errors) {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_RES,
      payload: response,
    });
  } else {
    yield put({
      type: BusinessSetup.MANAGER_USER_BOOKING_REASSIGN_APPLY_RES,
      payload: { error: "something went wrong" },
    });
  }
}
export function* GetStaffAvailability() {
  yield takeLatest("STAFF_AVAILABILITY_REQ", getStaffsAvailability);
}
function* getStaffsAvailability(action: any) {
  let response = yield call(getStaffAvailability, action.id, action.body);
  if (response && !response.errors) {
    yield put({
      type: "STAFF_AVAILABILITY_RES",
      payload: response.data,
    });
  } else {
    yield put({
      type: "STAFF_AVAILABILITY_RES",
      payload: response,
    });
  }
}
export function* bookAppointmentReq() {
  yield takeLatest("BOOK_APPOINTMENT_REQ", bookAppointmentReqs);
}
function* bookAppointmentReqs(action: any) {
  let response = yield call(bookAppointment, action.id, action.body);
  if (response && response.responseType === "success") {
    yield put({
      type: "BOOK_APPOINTMENT_RES",
      payload: response,
    });
  } else {
    yield put({
      type: "BOOK_APPOINTMENT_RES",
      payload: response,
    });
  }
}
