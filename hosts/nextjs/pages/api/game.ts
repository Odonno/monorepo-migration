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
  if (req.method === "GET") {
    convertApiResponse(res, GameApi.get(response));
    return;
  }

  if (req.method === "POST") {
    convertApiResponse(res, GameApi.post(response, req.body));
    return;
  }

  if (req.method === "DELETE") {
    convertApiResponse(res, GameApi.del(response));
    return;
  }

  res.setHeader("Allow", ["GET", "POST", "DELETE"]).status(405);
}
