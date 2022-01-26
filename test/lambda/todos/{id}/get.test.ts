import { ulid } from "ulid";
import { handler } from "../../../../lib/lambda/api/todos/{id}/get";

describe('/todos/get', () => {
  it('should return a 400 if the id is not a ULID', async () => {
    const res = await handler({
      pathParameters: { },
    });

    expect(typeof res).toBe('object');
    expect(res.statusCode).toBe(400);
  });

  it('should return a 400 if the id is not a ULID', async () => {
    const res = await handler({
      pathParameters: {
        id: '',
      },
    });

    expect(typeof res).toBe('object');
    expect(res.statusCode).toBe(400);
  });

  it('should return a 404 if the id is a ULID but not in the array', async () => {
    const res = await handler({
      pathParameters: {
        id: ulid(),
      },
    });

    expect(typeof res).toBe('object');
    expect(res.statusCode).toBe(404);
  });
});