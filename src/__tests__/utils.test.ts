import { camelizeKeys } from '../utils';

describe('custom-resource-helper: utils', () => {
  it('should camelize the keys', () => {
    const resoourceProperties = {
      BucketName: 'bucket',
      Events: ['one', 'two', 'three'],
      Environment: {
        KeyName1: 'Value1',
        KeyName2: 'Value2',
        KeyName3: null,
      },
      ObjectArray: [
        {
          Object1: 'Foo'
        },
        {
          Object2: 'Bar'
        }
      ]
    };

    const expected = {
      bucketName: 'bucket',
      events: ['one', 'two', 'three'],
      environment: {
        keyName1: 'Value1',
        keyName2: 'Value2',
        keyName3: null,
      },
      objectArray: [
        {
          object1: 'Foo'
        },
        {
          object2: 'Bar'
        }
      ]
    };

    expect(camelizeKeys(resoourceProperties)).toEqual(expected);
  });
});
