import type { APIRoute } from "astro";
import { createDefaultGridApiResponse } from "functions";
import * as GameApi from "functions/api/game";
import { convertApiResponse } from "../../functions/api";

const response = createDefaultGridApiResponse();

export const all: APIRoute = async ({ request }) => {
  if (request.method === "GET") {
    return convertApiResponse(GameApi.get(response));
  }

  if (request.method === "POST") {
    const body = await request.json();
    return convertApiResponse(GameApi.post(response, body));
  }

  if (request.method === "DELETE") {
    return convertApiResponse(GameApi.del(response));
  }

  return {
    status: 405,
  } as Response;
};
