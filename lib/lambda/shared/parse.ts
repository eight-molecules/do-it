import { Temporal } from "@js-temporal/polyfill";

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

export const parseTemporal = (obj: any) => {
  try { 
    return Temporal.ZonedDateTime.from(obj);
  } catch (error) {
    return undefined;
  }
};