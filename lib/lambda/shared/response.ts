const defaultResponses: { [key: number]: () => { message: string } } = {
  200: () => ({ message: 'Success' }),
  400: () => ({ message: 'Bad Request' }),
  404: () => ({ message: 'Not Found' }),
  500: () => ({ message: 'Internal Server Error' }),
};

interface ResponseOptions {
  minify?: boolean,
}

export const response = (statusCode: number, body?: any, options?: ResponseOptions) => {
  const useDefault = (typeof body === 'undefined' && typeof options === 'undefined');

  const responseBody = useDefault ? defaultResponses[statusCode]?.() ?? '' : body;
  const responseBodyValue = options?.minify ? JSON.stringify(body) : JSON.stringify(responseBody, null, 2);

  return {
    statusCode,
    body: responseBodyValue,
  };
};
