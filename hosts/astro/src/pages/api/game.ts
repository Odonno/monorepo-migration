import type { APIRoute } from "astro";
import { createDefaultGridApiResponse } from "functions";
import * as GameApi from "functions/api/game";
import { convertApiResponse } from "../../functions/api";

const response = createDefaultGridApiResponse();

export const all: APIRoute = async ({ request }) => {
  switch (request.method) {
    case "GET":
      return convertApiResponse(GameApi.get(response));
    case "POST":
      const body = await request.json();
      return convertApiResponse(GameApi.post(response, body));
    case "DELETE":
      return convertApiResponse(GameApi.del(response));
    default:
      return {
        status: 405,
      } as Response;
  }
};
