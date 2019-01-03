import { CloudFormationCustomResourceCreateEvent } from 'aws-lambda';
import { logFactory } from '../log-factory';

const createTestEvent = (
  logLevel?: string
): CloudFormationCustomResourceCreateEvent => ({
  RequestType: 'Create',
  ServiceToken: 'ServiceToken',
  RequestId: 'unique id for this create request',
  ResponseURL: 'pre-signed-url-for-create-response',
  ResourceType: 'Custom::MyCustomResourceType',
  LogicalResourceId: 'name of resource in template',
  StackId: 'arn:aws:cloudformation:us-east-2:namespace:stack/stack-name/guid',
  ResourceProperties: {
    LogLevel: logLevel || undefined,
    ServiceToken: 'ServiceToken',
    key1: 'string',
    key2: ['list']
  }
});

describe('custom-resource-helper: log-factory', () => {
  it('should create a logger with logLevel warning', () => {
    const logger = logFactory(createTestEvent());
    expect(logger.level).toBe('warning');
  });

  it('should create a logger with logLevel debug', () => {
    const logger = logFactory(createTestEvent('debug'));
    expect(logger.level).toBe('debug');
  });
});
