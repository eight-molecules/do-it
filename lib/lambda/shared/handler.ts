import { parseBoolean } from './parse';
import { response } from './response';

export const handlerFactory = (handlerFn: Function) => async (event: any = { }, context: any = { }, callback: Function = async () => { }) => {  
  context.callbackWaitsForEmptyEventLoop = true;

  try {
    return await handlerFn(event, context, callback);
  } catch (e) {
    console.error(e);
    response(500);
  }
};

export const queryStringExtractorFactory = (mapFn: Function) => (event: any) => {
  const queryStringParameters = event.queryStringParameters ?? { };
  const { minify } =  queryStringParameters;

  return { 
    minify: parseBoolean(minify),
    ...mapFn(queryStringParameters)
  };
};

export const extractQueryStringParameters = (event: any) => {
  if ((typeof event !== 'object' || !event.hasOwnProperty('queryStringParameters'))) {
    return {
      minify: false
    };
  }

  const { minify = 'false' } = event.queryStringParameters;

  return {
    minify: parseBoolean(minify) ?? false,
  };
};