import { Temporal } from "@js-temporal/polyfill";
import { encodeTime } from "ulid";

export default [
  {
    'id': '0001GZ677BFT6AA82RGJP3EH9S',
    'title': 'Create Api',
    'description': 'Create an api to serve this data.',
    'done': true,
    'lastModified': encodeTime(Temporal.Now.zonedDateTimeISO('America/New_York').epochSeconds, 10)
  },
  {
    'id': '0001GZ8VKBKZY7N0BM5ZPY94VG',
    'title': 'Update a done status',
    'description': 'Create a way to persist updates to complete the Create Api item.',
    'done': false,
    'lastModified': encodeTime(Temporal.Now.zonedDateTimeISO('America/New_York').epochSeconds, 10)
  },
  {
    'id': '0001GZ3JVBR8MAA9JMVEGANH5G',
    'title': 'Create App',
    'description': 'Create a react app to display this data',
    'done': false,
    'lastModified': encodeTime(Temporal.Now.zonedDateTimeISO('America/New_York').epochSeconds, 10)
  }
];