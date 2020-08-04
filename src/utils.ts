import camelcaseKeys from 'camelcase-keys';

export const camelizeKeys = <K, E extends Record<string, unknown>>(obj: E): K => 
    camelcaseKeys<E>(obj, { deep: true }) as K;
