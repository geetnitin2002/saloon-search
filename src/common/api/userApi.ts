import ApiRequest from "./apiRequest";
export const userLoginApi = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/login", null, body, null);
};

export const verifyEmailApi = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/verifyEmail", null, body, null);
};

export const verifySeucrityQuestionApi = async (
  body: any,
  id: any
): Promise<any> => {
  const url = "/user/" + id + "/verifySecurityResponses";
  return ApiRequest.post(url, null, body, null);
};

export const resetpasswordAPi = async (body: any): Promise<any> => {
  return ApiRequest.post("/user/resetPassword", null, body, null);
};
