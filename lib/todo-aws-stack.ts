import * as path from 'path';

import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

import { removalPolicy } from '../env';

import { StaticWebsiteNestedStack } from './stacks/StaticWebsiteStack';

export class TodoAwsStack extends Stack {
  api: apigateway.RestApi;
  client: StaticWebsiteNestedStack;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.client = new StaticWebsiteNestedStack(this, 'TodoAppClient');

    this.api = new apigateway.RestApi(this, 'TodoRestApi', { });
    this.api.root.addResource('todos', {
      defaultCorsPreflightOptions: {
        allowOrigins: [ 'https://*.prettycool.link' ],
        allowMethods: [ 'GET' ]
      }
    })

    const getTodosHandler = new lambda.Function(this, 'GetTodos', {
      runtime: lambda.Runtime.NODEJS_14_X, 
      code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
      handler: 'todos.get'
    });

    this.api.root.getResource('todos')?.addMethod('GET', new apigateway.LambdaIntegration(getTodosHandler));

    this.api.applyRemovalPolicy(removalPolicy);
  }
}
