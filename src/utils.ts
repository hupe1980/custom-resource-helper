import camelCase from 'lodash.camelcase';

const isObject = (obj:any) => obj !== null && typeof obj === 'object';

export const camelizeKeys = (obj:any): any => {
    if (Array.isArray(obj)) {
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
