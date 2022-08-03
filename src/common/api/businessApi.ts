import ApiRequest from "./apiRequest";
export const addBusinessMain = async (body: any): Promise<any> => {
  return ApiRequest.post("/business/addBusinessMain", null, body, null);
};
export const addBusinessAddress = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessAddress";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessExtraInfo = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/addBusinessExtraInfo";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessHolidays = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessHolidays";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessService = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessService";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessSettings = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessSettings";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessHours = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessHours";
  return ApiRequest.post(url, null, body, null);
};
export const addBusinessStaff = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/addBusinessStaff";
  return ApiRequest.post(url, null, body, null);
};
export const bookTickets = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/bookTickets";
  return ApiRequest.post(url, null, body, null);
};

export const workingHours = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/workingHours";
  return ApiRequest.post(url, null, body, null);
};
export const deleteBusinessService = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/deleteBusinessService";
  return ApiRequest.post(url, null, body, null);
};
export const deleteBusinessStaff = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/deleteBusinessStaff";
  return ApiRequest.post(url, null, body, null);
};

export const getBusinessService = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/services";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessStaff = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/staff";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessWeek = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/weeksRange";
  return ApiRequest.get(url, null, null, null);
};
export const getBusinessAddressInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/address";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessMainInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/mainFields";
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessDetails = async (id: any): Promise<any> => {
  const url = "/business/" + id;
  return ApiRequest.post(url, null, null, null);
};
export const getBusinessByBehaviorDetails = async (
  id: any,
  request: any
): Promise<any> => {
  const url = "/business/" + id;
  return ApiRequest.post(url, null, request, null);
};
export const getBusinessExtraInfo = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/extraInfo";
  return ApiRequest.post(url, null, null, null);
};

export const bookTicket = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/bookTickets";
  return ApiRequest.post(url, null, body, null);
};
export const getTicketsAvailability = async (
  id: any,
  name: any
): Promise<any> => {
  const url =
    "/business/" + id + "/service/" + name + "/getTicketsAvailability";
  return ApiRequest.get(url, null, null, null);
};

export const getBusinessWorkingHourSlots = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/businessWorkingHourSlotsRange";
  return ApiRequest.get(url, null, null, null);
};
export const getBusinessWeekRange = async (id: any): Promise<any> => {
  const url = "/business/" + id + "/weeksRange";
  return ApiRequest.post(url, null, null, null);
};
export const serviceCategoriessAndBusinesses = async (): Promise<any> => {
  const url = "/serviceCategoriessAndBusinesses";
  return ApiRequest.get(url, null, null, null);
};

export const getBusinessLocationList = async (): Promise<any> => {
  const url = "/locations";
  return ApiRequest.get(url, null, null, null);
};

export const SearchCategoriessAndBusinesses = async (
  body: any
): Promise<any> => {
  const url = "/search";
  return ApiRequest.post(url, null, body, null);
};
export const userBooking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/user/bookings";
  return ApiRequest.post(url, null, body, null);
};
export const staffUserBooking = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/user/bookings";
  return ApiRequest.post(url, null, body, null);
};
export const userBookingCancel = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/cancelBooking";
  return ApiRequest.post(url, null, body, null);
};
export const userBookingNoShow = async (id: any, body: any): Promise<any> => {
  const url = "/business/" + id + "/noShow";
  return ApiRequest.post(url, null, body, null);
};

export const getReassignmentData = async (
  id: any,
  bookingNumber: any
): Promise<any> => {
  const url =
    "/business/" + id + "/booking/" + bookingNumber + "/getReassignmentData";
  return ApiRequest.post(url, null, null, null);
};
export const applyReassignment = async (
  id: any,
  bookingNumber: any,
  data: any
): Promise<any> => {
  const url =
    "/business/" + id + "/booking/" + bookingNumber + "/applyReassignment";
  return ApiRequest.post(url, null, data, null);
};
export const getStaffAvailability = async (
  id: any,
  body: any
): Promise<any> => {
  const url = "/business/" + id + "/getStaffAvailability";
  return ApiRequest.post(url, null, body, null);
};
export const bookAppointment = async (id: any, data: any): Promise<any> => {
  const url = "/business/" + id + "/bookAppointment";
  return ApiRequest.post(url, null, data, null);
};
export const getBusinessSkillStaff = async (
  id: any,
  data: any
): Promise<any> => {
  const url = "/business/" + id + "/skilledStaff";
  return ApiRequest.post(url, null, data, null);
};
export const permittedServiceKinds = async (
  id: any,
  data: any
): Promise<any> => {
  const url = "/business/" + id + "/permittedServiceKinds";
  return ApiRequest.post(url, null, data, null);
};
export const checkBookingForPotentialClash = async (
  id: any,
  data: any
): Promise<any> => {
  const url = "/business/" + id + "/checkBookingForPotentialClash";
  return ApiRequest.post(url, null, data, null);
};
export const staffName = async (id: any): Promise<any> => {
  const url = "/user/" + id + "/staffName";
  return ApiRequest.post(url, null, null, null);
};

export const getImages = async (
  b_id: any
): Promise<{ data: { Main: any; Child: Array<any> } }> => {
  const url = `/business/${b_id}/images`;
  return ApiRequest.get(url, null, null, null);
};
