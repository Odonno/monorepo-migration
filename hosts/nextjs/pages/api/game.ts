import { GridApiResponse } from "data";
import { createDefaultGridApiResponse } from "functions";
import * as GameApi from "functions/api/game";
import type { NextApiRequest, NextApiResponse } from "next";
import { convertApiResponse } from "../../functions/api";

const response = createDefaultGridApiResponse();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GridApiResponse>
) {
  switch (req.method) {
    case "GET":
      convertApiResponse(res, GameApi.get(response));
    case "POST":
      convertApiResponse(res, GameApi.post(response, req.body));
    case "DELETE":
      convertApiResponse(res, GameApi.del(response));
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]).status(405);
  }
}
