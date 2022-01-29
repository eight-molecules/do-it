import { extractQueryStringParameters, handlerFactory } from "../../shared/handler";
import { response } from "../../shared/response";
import { createTodo } from "../../services/todo.service";

export const handler = handlerFactory(async (event: any) => { 
  const body = JSON.parse(event.body);
  const { minify } = extractQueryStringParameters(event);

  if (typeof body.title !== 'string') {
    return response(400, undefined, { minify });
  }

  const { title, description, done } = body;
  const todo = await createTodo(title, {
    description: typeof description === 'string' ? description : undefined,
    done: typeof done === 'boolean' ? done : undefined,
  });

  return response(200, todo, { minify });
});