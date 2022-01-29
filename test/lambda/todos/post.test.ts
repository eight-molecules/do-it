import { Temporal } from "@js-temporal/polyfill";
import { decodeTime } from "ulid";
import { handler } from "../../../lib/lambda/api/todos/post";
import { Todo } from "../../../lib/lambda/services/todo.service";
import { isULID } from "../../../lib/lambda/shared/ulid";

describe('POST /todos', () => {
  it('should return a 200 when given a title', async () => {
    const event = {
      body: {
        title: 'Test Todo'
      }
    };

    const res = await handler(event);
    
    expect(typeof res).toBe('object');
    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body) as Todo;
    
    const { id, title, description, done, lastModifiedDate, createdDate } = body;

    expect(isULID(id)).toBe(true);
    expect(typeof title).toBe('string');
    expect(typeof description).toBe('string');
    expect(typeof done).toBe('boolean');
    expect(typeof lastModifiedDate).toBe('string');
    expect(typeof createdDate).toBe('string');

    expect(Temporal.ZonedDateTime.compare(lastModifiedDate, createdDate)).toBe(0);
  });
});