const defaultResponses: { [key: number]: () => String } = {
  200: () => 'Success',
  400: () => 'Bad Request',
  404: () => 'Not Found',
  500: () => 'Internal Server Error'
};

export const response = (statusCode: number, body?: any) => {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : defaultResponses[statusCode]?.() ?? '',
  };
};
