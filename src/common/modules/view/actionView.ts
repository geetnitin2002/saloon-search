export const getSearchResults = (id: any, data: any, type: any) => ({
  id,
  type,
  body: data
});

export const getReassignmentData = (id: any, bookingId: any, type: any) => ({
  id,
  type,
  bookingId
});
export const applyReassignment = (
  id: any,
  bookingId: any,
  data: any,
  type: any
) => ({
  id,
  type,
  bookingId,
  body: data
});
