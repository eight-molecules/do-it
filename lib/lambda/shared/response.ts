const defaultResponses: { [key: number]: { message: string } } = {
  200: ({ message: 'Success' }),
  400: ({ message: 'Bad Request' }),
  404: ({ message: 'Not Found' }),
  500: ({ message: 'Internal Server Error' }),
};

interface ResponseOptions {
  minify?: boolean,
}

const defaultBody = (statusCode: number) => defaultResponses[statusCode] ?? '';
export const response = (statusCode: number, body?: any, options?: ResponseOptions) => {
  const responseBody = typeof body === 'undefined' ?  defaultBody(statusCode) : body;
  const responseBodyValue = options?.minify ? JSON.stringify(responseBody) : JSON.stringify(responseBody, null, 2);

  return {
    statusCode,
    body: responseBodyValue,
  };
};
