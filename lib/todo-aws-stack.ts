import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';

import { StaticWebsiteNestedStack } from './stacks/StaticWebsiteStack';

export class TodoAwsStack extends Stack {
  api: apigateway.RestApi;
  client: StaticWebsiteNestedStack;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.client = new StaticWebsiteNestedStack(this, 'TodoAppClient');

    this.api = new apigateway.RestApi(this, 'TodoRestApi', { });
    this.api.root.addResource('/todos', {
      defaultCorsPreflightOptions: {
        allowOrigins: [ 'https://*.prettycool.link' ],
        allowMethods: [ 'GET' ]
      }
    })
  }
}
