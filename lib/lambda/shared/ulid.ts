import * as ulid from 'ulid';
export * from 'ulid';

export const encodeTime = (now: number) => ulid.encodeTime(now, 10);

const pattern = /([0-9A-HJKMNP-TV-Z]{10})([0-7A-HJKMNP-TV-Z]{1})([0-9A-HJKMNP-TV-Z]{15})/;
export const isULID = (value: string) => (typeof value === 'string' && pattern.test(value));