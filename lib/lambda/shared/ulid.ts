export { ulid } from 'ulid';

const pattern = /[0-9A-HJKMNP-TV-Z]{10}[0-7A-HJKMNP-TV-Z]{1}[0-9A-HJKMNP-TV-Z]{15}/;

export const isULID = (value: any) => typeof value === 'string' && pattern.test(value);