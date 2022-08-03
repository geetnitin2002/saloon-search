// @ts-ignore
import { BusinessSetup } from "custom-actions";

export const getSearchResults = () => ({
  type: BusinessSetup.GET_BUSINESS_SERVICES_COMBINED
});
export const SearchForLocationAndBusiness = (body: any) => ({
  body, 
  type: BusinessSetup.SEARCH_BUSINESS
});
export const getBusinessLocation = () => ({
  type: BusinessSetup.GET_BUSINESS_LOCATIONS
});
