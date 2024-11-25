import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaContext, StackContext } from "./TypeDefinitions";
import * as lambda from '@aws-cdk/aws-lambda';
import path = require("path");
import { camelCase } from "./utilities";
export interface ILambdaStackProps extends cdk.StackProps {
    context: StackContext
}
export class lambdaStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: ILambdaStackProps) {
        super(scope, id, props);

        const context: StackContext = props?.context;

        context.Lambdas.forEach((lambdaContext: LambdaContext) => {

            // Merge common and lambda-specific environment variables
            const lambdaEnvVariables: { [key: string]: string } = {
                ...context.CommonLambdaEnv,
                ...lambdaContext.ENV,
            };

            // Ensure TABLE_ENVN is set; default to EnvironmentName if missing
            lambdaEnvVariables.TABLE_ENVN = lambdaEnvVariables.TABLE_ENVN || context.EnvironmentName;

            const lambdaConfigObject: any = {
                functionName: cdk.Fn.join("-didar-", [
                    lambdaContext.Name,
                    context.EnvironmentName,
                ]),
                runtime: lambda.Runtime.NODEJS_14_X,
                handler: "index.handler",
                code: lambda.Code.fromAsset(
                    path.resolve(__dirname, `../lambda/${lambdaContext.Name}`)
                ),
                // layers: lambdaLayers,
                // Uncomment and provide a role if required
                // role: lambdaRole,
                timeout: cdk.Duration.seconds(lambdaContext.Timeout),
                memorySize: lambdaContext.MemorySize,
                allowPublicSubnet: true,
                environment: lambdaEnvVariables,
                tracing: lambda.Tracing.ACTIVE,
            };

            const lambdaFunction = new lambda.Function(this, lambdaContext.Name, {
                ...lambdaConfigObject, // Spread the configuration object to apply all properties
            });
            new cdk.CfnOutput(this, `${camelCase(lambdaContext.Name, "-")}ARN`, {
                exportName: `${lambdaContext.Name}-didar-${context.EnvironmentName}`,
                value: lambdaFunction.functionArn,
            });
        })

    }
};