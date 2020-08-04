import * as winston from 'winston';
import { CloudFormationCustomResourceEvent, Context } from 'aws-lambda';

export type Logger = winston.Logger

export interface LogFactory {
  (event: CloudFormationCustomResourceEvent, context?: Context): Logger;
}

export const logFactory: LogFactory = event => {
  const level = getLogLevel(event);

  const logger = winston.createLogger({
    level,
    transports: new winston.transports.Console()
  });

  return logger;
};

const getLogLevel = (event: CloudFormationCustomResourceEvent): string => {
  if (event.ResourceProperties) {
    const props = event.ResourceProperties;
    return props.LogLevel || 'warning';
  }
  return 'warning'; //default
};
