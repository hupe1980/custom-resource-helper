import camelcaseKeys from 'camelcase-keys';

export const camelizeKeys = <T>(obj: T): T => camelcaseKeys<T>(obj, { deep: true });
