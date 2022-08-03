import { all } from "redux-saga/effects";
import {
  userLogin,
  userProfileSaga,
  userVerifyEmail,
  userResetPassword,
  userVerifySecurityQuestion
} from "./userProfile/userProfileSaga";
import {
  addBusinessSaga,
  addBusinessAddres,
  addBusinessHourss,
  addBusinessExtaInfos,
  addNewBusinessSettings,
  addNewBusinessHoliday,
  addNewBusinessServices,
  addNewBusinessStaff,
  deleteNewBusinessServices,
  deleteNewBusinessStaff,
  getBusinessstaff,
  getBusinesService,
  getBusinessAddres,
  getBusiness,
  getBusinessbyBehavior,
  getBusinessExtraInf,
  bookTicketSaga,
  getTicketsAvailable,
  getBusinessWorkingHours,
  getBusinessPerWeekRange,
  getBusinesWeek,
  getBusinessSkillstaff
} from "./businessSetup/businessSaga";
import {
  getServiceCategoriessAndBusinesses,
  getBusinessLocation,
  SearchForCategoriessAndBusinesses,
  userBookingREq,
  userBookingREqnoShow,
  userBookingREqCancel,
  usergetReassignmentData,
  userapplyReassignment,
  staffuserBookingREq,
  staffUserBookingREqnoShow,
  GetStaffAvailability,
  bookAppointmentReq
} from "./businessDetail/businessDetailsSaga";
function* rootSaga() {
  yield all([
    userProfileSaga(),
    userLogin(),
    userVerifyEmail(),
    userVerifySecurityQuestion(),
    userResetPassword(),
    addBusinessSaga(),
    addBusinessAddres(),
    addBusinessHourss(),
    addBusinessExtaInfos(),
    addNewBusinessSettings(),
    addNewBusinessHoliday(),
    addNewBusinessServices(),
    addNewBusinessStaff(),
    deleteNewBusinessServices(),
    deleteNewBusinessStaff(),
    getBusinessstaff(),
    getBusinesService(),
    getBusinessAddres(),
    getBusiness(),
    getBusinessbyBehavior(),
    getBusinessExtraInf(),
    bookTicketSaga(),
    getTicketsAvailable(),
    getBusinessWorkingHours(),
    getBusinessPerWeekRange(),
    getServiceCategoriessAndBusinesses(),
    getBusinessLocation(),
    SearchForCategoriessAndBusinesses(),
    userBookingREq(),
    userBookingREqnoShow(),
    userBookingREqCancel(),
    usergetReassignmentData(),
    userapplyReassignment(),
    staffuserBookingREq(),
    staffUserBookingREqnoShow(),
    getBusinesWeek(),
    GetStaffAvailability(),
    bookAppointmentReq(),
    getBusinessSkillstaff()
  ]);
}

export default rootSaga;