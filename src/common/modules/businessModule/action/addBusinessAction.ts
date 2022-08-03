// @ts-ignore
import { BusinessSetup } from "custom-actions";

export const addBusiness = (data: any) => ({
  type: BusinessSetup.BUSINESS_ADD,
  body: data
});
export const getBusiness = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET
});
export const getBusinessByBehavior = (id: any, request: any) => ({
  id,
  type: "BUSINESS_BY_BEHAVIOR_GET",
  body: request
});
export const addBusinessAddress = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_ADDRESS_FIELDS,
  body: data
});
export const getBusinessAddress = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_ADDRESS_FIELDS
});
export const addBusinessHour = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_HOUR_FIELDS,
  body: data
});
export const addBusinessExtraInfo = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_EXTRA_FIELDS,
  body: data
});
export const addBusinessSettings = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_SETTINGS,
  body: data
});

export const addBusinessHolidays = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_HOLIDAYS,
  body: data
});
export const addBusinessServices = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_SERVICES,
  body: data
});
export const addBusinessStaff = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_ADD_STAFF,
  body: data
});
export const deleteBusinessServices = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_DELETE_SERVICES,
  body: data
});
export const deleteBusinessStaff = (id: any, data: any) => ({
  id,
  type: BusinessSetup.BUSINESS_DELETE_STAFF,
  body: data
});
export const getBusinessServices = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_LIST_SERVICES
});
export const getBusinessStaff = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_LIST_STAFF
});
export const businessResetResponse = () => ({
  type: BusinessSetup.BUSINESS_RESPONSE_RESET
});

export const getBusinessExtraInfo = (id: any) => ({
  id,
  type: BusinessSetup.BUSINESS_GET_EXTRA_FIELDS
});

export const bookTicket = (data: any, id: any) => ({
  id,
  type: BusinessSetup.TICKET_BOOKING_REQ,
  body: data
});

export const ticketBookingReset = () => ({
  type: BusinessSetup.TICKET_BOOKING_RESET
});
export const getTicketsAvailability = (id: any, name: any) => ({
  id,
  name,
  type: BusinessSetup.GET_TICKETS_AVAILABILITY
});
