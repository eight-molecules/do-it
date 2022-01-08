import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { StaticWebsiteNestedStack } from './stacks/StaticWebsiteStack';
export class TodoAwsStack extends Stack {
  client: StaticWebsiteNestedStack;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    this.client = new StaticWebsiteNestedStack(this, 'TodoAppClient');


  }
}
