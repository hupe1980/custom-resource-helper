# custom-resource-helper

[![Build Status](https://travis-ci.org/hupe1980/custom-resource-helper.svg?branch=master)](https://travis-ci.org/hupe1980/custom-resource-helper)

> A helper for cloudformation custom resources

## Install

```bash
npm install --save custom-resource-helper
```

## How to use

```typescript
import { customResourceHelper, ResourceHandler, ResourceHandlerReturn } from 'custom-resource-helper';

export const handler = customResourceHelper(
  (): ResourceHandler => ({
    onCreate: async (event, context, logger): Promise<ResourceHandlerReturn> => {
      // Place your code to handle Create events here.
      const physicalResourceId = 'myResourceId';
      const responseData = {};

      return {
        physicalResourceId,
        responseData
      };
    },
    onUpdate: async (event, context, logger): Promise<ResourceHandlerReturn> => {
      // Place your code to handle Update events here.
      const physicalResourceId = event.PhysicalResourceId;
      const responseData = {};

      return {
        physicalResourceId,
        responseData
      };
    },
    onDelete: async (event, context, logger): Promise<void> => {
      // Place your code to handle Delete events here
      return;
    }
  })
  /* optional: customLogFactory */
);
```

## Logging

By default log level is set to warning. This can be customized with a custom LogFactory or by defining the "LogLevel" property in the custom resource resource in your template. For example:

```json
"MyCustomResource": {
    "Type": "AWS::CloudFormation::CustomResource",
    "Properties": {
        "LogLevel": "debug",
        //...
    }
}
```

## Utils

```typescript
import { camelizeKeys } from 'custom-resource-helper';
//...
console.log(event);
/*
{
  ...
  ResourceProperties: {
    ...
    BucketName: 'testbucket',
    ---
  }
  ...
}
*/
const {
  resourceProperties: { bucketName }
} = camelizeKeys(event);

console.log(bucketName); //prints: testBuckets
//...
```
