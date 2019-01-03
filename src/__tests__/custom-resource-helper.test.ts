import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { CloudFormationCustomResourceEvent, Context } from 'aws-lambda';

import {
  //customResourceHelper,
  ResourceHandler
} from '../custom-resource-helper';

const { customResourceHelper } = require('../custom-resource-helper');

const testEvent: CloudFormationCustomResourceEvent = {
  RequestType: 'Create',
  ServiceToken: 'ServiceToken',
  RequestId: 'unique id for this create request',
  ResponseURL: 'pre-signed-url-for-create-response',
  ResourceType: 'Custom::MyCustomResourceType',
  LogicalResourceId: 'name of resource in template',
  StackId: 'arn:aws:cloudformation:us-east-2:namespace:stack/stack-name/guid',
  ResourceProperties: {
    ServiceToken: 'ServiceToken',
    key1: 'string',
    key2: ['list']
  }
};

const testContext: Context = {
  functionName: 'Func',
  functionVersion: '1.0',
  invokedFunctionArn: 'arn:',
  memoryLimitInMB: 128,
  awsRequestId: 'RequestID',
  logGroupName: 'LogName',
  logStreamName: '/aws/log/stream',
  callbackWaitsForEmptyEventLoop: false,
  getRemainingTimeInMillis: () => 1,
  done: jest.fn(),
  fail: jest.fn(),
  succeed: jest.fn()
};

const createResourceHandler = (sleep = 0): ResourceHandler => ({
  onCreate: jest.fn(() => {
    return new Promise(resolve =>
      setTimeout(() => resolve({ physicalResourceId: '123' }), sleep)
    );
  }),
  onUpdate: jest.fn(() => ({
    physicalResourceId: '123'
  })),
  onDelete: jest.fn()
});

const mock = new MockAdapter(axios);

describe('custom-resource-helper: helper', () => {
  beforeEach(() => {
    mock.reset();
    mock.onPut().reply(200);
  });

  it('should sends a success response', async () => {
    await customResourceHelper(() => createResourceHandler())(
      testEvent,
      testContext
    );

    const data = JSON.parse(mock.history.put[0].data);
    expect(data.Status).toBe('SUCCESS');
  });

  it('should sends a failed response', async () => {
    await customResourceHelper(() => {
      throw new Error();
    })(testEvent, testContext);

    const data = JSON.parse(mock.history.put[0].data);
    expect(data.Status).toBe('FAILED');
  });

  it('should abort execution and send failure message', async () => {
    await customResourceHelper(() => createResourceHandler(5))(
      testEvent,
      testContext
    );

    const data = JSON.parse(mock.history.put[0].data);
    expect(data.Status).toBe('FAILED');
    expect(data.Reason).toBe('Execution timed out');
  });
});
