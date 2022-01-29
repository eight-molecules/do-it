import { Temporal } from "@js-temporal/polyfill";
import { TcpSocketConnectOpts } from "net";
import { decodeTime } from "ulid";

export const convertTenBitTimestampToZonedDateTime = (ts: string) => {
  if (ts.length < 10) {
    throw new Error('Timestamp too short.');
  }
  
  return Temporal.Instant.fromEpochSeconds(decodeTime(ts.padEnd(26, '0'))).toZonedDateTimeISO('America/New_York');
}