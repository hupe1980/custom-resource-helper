import camelCase from 'lodash.camelcase';

const isObject = (obj: unknown):obj is Record<string, unknown> => obj !== null && typeof obj === 'object';

const isArray = (arr: unknown):arr is Array<string | Record<string, unknown>> => Array.isArray(arr);

export const camelizeKeys = (obj: unknown): unknown => {
    if (isArray(obj)) {
      return obj.map(v => camelizeKeys(v));
    } else if (isObject(obj)) {
      return Object.keys(obj).reduce(
        (acc, key) => ({
          ...acc,
          [camelCase(key)]: camelizeKeys(obj[key])
        }),
        {}
      );
    }

    return obj;
}
