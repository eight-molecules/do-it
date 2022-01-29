import { extractQueryStringParameters, handlerFactory } from "../../shared/handler";
import { response } from "../../shared/response";
import { createTodo } from "../../services/todo.service";

export const handler = handlerFactory(async (event: any) => { 
  const { body } = event;
  const { minify } = extractQueryStringParameters(event);

  if (!('title' in body) || typeof body.title !== 'string') {
    return response(400, undefined, { minify });
  }

  const todo = createTodo(body.title);

  return response(200, todo, { minify });
});