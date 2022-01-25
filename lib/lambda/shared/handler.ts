import { response } from "./response";

export const handlerFactory = (handlerFn: Function) => async (event: any = { }, context: any = { }, callback: Function = async () => { }) => {  
  context.callbackWaitsForEmptyEventLoop = true;

  try {
    return await handlerFn(event, context, callback);
  } catch (e) {
    console.error(e);
    response(500);
  }
};