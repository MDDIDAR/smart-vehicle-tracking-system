#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { lambdaStack } from '../lib/lambda-stack';
import { StackContext } from '../lib/TypeDefinitions';
import { readFileSync } from 'fs';

const app = new cdk.App();
const inputFile: string = app.node.tryGetContext("config");
const context: StackContext =JSON.parse(readFileSync(inputFile).toString());
new lambdaStack(app, 'LambdaStack',{
  env:{
      account: context.AWSAccount,
      region: context.AWSRegion
},
context: context
});