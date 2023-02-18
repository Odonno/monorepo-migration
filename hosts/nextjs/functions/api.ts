import { ApiResponse } from "data";
import { NextApiResponse } from "next";

export const convertApiResponse = <T>(
  res: NextApiResponse<T>,
  apiResponse: ApiResponse
) => {
  res.status(apiResponse.status || 200).json(apiResponse.response);
};
