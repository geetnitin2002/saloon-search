// @ts-ignore
import { BusinessSetup } from "custom-actions";

export const getWeekDetails = (id: any) => ({
  id,
  type: "BOOKING_GET_WEEK"
});
export const getBusinessWorkingRange = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_WORKING_HOUR_SLOTS
});
export const getStaffDetails = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_LIST_STAFF
});
export const getServiceDetails = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_LIST_SERVICES
});
export const getStaffAvailability = (id: any, body: any) => ({
  id,
  body,
  type: "STAFF_AVAILABILITY_REQ"
});
export const bookAppointment = (id: any, body: any) => ({
  id,
  body,
  type: "BOOK_APPOINTMENT_REQ"
});
export const resetbookAppointment = () => ({
  type: "BOOK_APPOINTMENT_RESET"
});
export const getSkillStaff = (id: any, body: any) => ({
  id,
  body,
  type: "BUSINESS_GET_LIST_SKILL_STAFF"
});
