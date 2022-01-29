import { ulid } from "ulid";
import { extractQueryStringParameters, handlerFactory } from "../../shared/handler";
import todos from '../../services/todos';
import { response } from "../../shared/response";

export const handler = handlerFactory(async (event: any) => { 
  const { body } = event;
  const { minify } = extractQueryStringParameters(event);

  if (!('title' in body)) {
    return response(400);
  }

  const todo = {
    id: ulid(),
    title: body.title,
    descriptionm: 
  }

  return response(200, todos, { minify });
});