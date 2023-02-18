import type { ApiResponse } from "data";

export const convertApiResponse = (apiResponse: ApiResponse) => {
  return {
    status: apiResponse.status || 200,
    body: JSON.stringify(apiResponse.response),
  };
};
