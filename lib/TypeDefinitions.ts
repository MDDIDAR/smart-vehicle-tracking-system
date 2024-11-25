export type StackContext = {
    EnvironmentName: string;
    Lambdas: LambdaContext[];
    AWSAccount: string;
    AWSRegion: string;
    VpcId: string;
    SubnetId1: string;
    SubnetId2: string;
    SecurityGroupId: string;
    LambdaRoleArn: string;
    StepFunctionRoleArn: string;
    EventBridgeRoleArn: string;
    CommonContext: CommonContext;
    CommonLambdaEnv: { [key: string]: string };
};
export type CommonContext = {
    VpcIdsSMName: string;
    SubnetId1SSMName: string;
    SubnetId2SSMName: string;
    SecurityGroupIdSSMName: string;
    LambdaRoleArnSSMName: string;
    StepFunctionRoleArnSSMName: string;
    EventBridgeRoleArnSSMName: string;
    ExportedStackName: string;
    Project: string;
    Application: string;
    Owner: string;
};
export type LambdaContext = {
    Name: string;
    MemorySize: number;
    Folder: string;
    Timeout: number;
    ENV: { [key: string]: string };
    UseVPC: boolean;
    Concurrency: number;
    Destination: string;
    IsDestination: boolean;
};