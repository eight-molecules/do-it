import { getTodo } from "../../../services/todo.service";
import { extractQueryStringParameters, handlerFactory } from "../../../shared/handler";
import { response } from "../../../shared/response";
import { isULID } from "../../../shared/ulid";

export const handler = handlerFactory(async (event: any) => { 
  const { id } = event.pathParameters;
  const { minify } = extractQueryStringParameters(event);

  if (!isULID(id)) {
    return response(400);
  }

  const todo = await getTodo(id);
  if (todo) { 
    return response(200, todo, { minify }); 
  }
  
  return response(404);
});