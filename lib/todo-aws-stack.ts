import * as path from 'path';

import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda-nodejs';

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
    });

    this.api.root.getResource('todos')?.addResource('{id}', {
      defaultCorsPreflightOptions: {
        allowOrigins: [ 'https://*.prettycool.link' ],
        allowMethods: [ 'GET' ]
      }
    });

    const getTodosHandler = new lambda.NodejsFunction(this, 'GetTodosFunction', {
      entry: path.join(__dirname, '/lambda/api/todos/get.ts'),
      handler: 'handler',
      bundling: {
        sourceMap: true,
        sourceMapMode: lambda.SourceMapMode.INLINE
      }
    });

    const getTodoHandler = new lambda.NodejsFunction(this, 'GetTodoFunction', {
      entry: path.join(__dirname, '/lambda/api/todos/{id}/get.ts'),
      handler: 'handler',
      bundling: {
        sourceMap: true,
        sourceMapMode: lambda.SourceMapMode.INLINE
      }
    });

    this.api.root.getResource('todos')?.addMethod('GET', new apigateway.LambdaIntegration(getTodosHandler), {
      authorizationType: apigateway.AuthorizationType.NONE
    });

    this.api.root.getResource('todos/{id}')?.addMethod('GET', new apigateway.LambdaIntegration(getTodoHandler), {
      authorizationType: apigateway.AuthorizationType.NONE
    });

    this.api.applyRemovalPolicy(removalPolicy);

    new CfnOutput(this, 'TodoAppDomainName', {
      value: `${this.client.distribution.distributionDomainName}`
    });
  }
}
