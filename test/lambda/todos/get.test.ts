import { handler } from "../../../lib/lambda/api/todos/get";

describe('/todos/get', () => {
  it('should return a set of todos', async () => {
    const res = await handler({
      queryStringParameters: null,
    });

    expect(typeof res).toBe('object');
    expect(typeof res.body).toBe('string');

    const body = JSON.parse(res.body);
    expect(Array.isArray(body)).toStrictEqual(true);
    
    expect(body.length).toStrictEqual(3);
  });
});