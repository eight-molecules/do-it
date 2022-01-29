import { Temporal } from '@js-temporal/polyfill';

export const parseBoolean = (str?: string) => {
  if (typeof str !== 'string') {
    return undefined;
  }

  const formattedString = str.toLowerCase();
  if (formattedString !== 'true' && formattedString !== 'false') {
    return undefined;
  }
  
  return formattedString === 'true';
};

export const parseTemporal = (obj?: string) => typeof obj === 'string' ? Temporal.ZonedDateTime.from(obj) : undefined;