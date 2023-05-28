import aws from "aws-sdk";

aws.config.region = "us-east-1";
aws.config.credentials = {
  accessKeyId: "", // put here your Access Key
  secretAccessKey: "", // put here your Secret Access Key
};

export const sns = new aws.SNS();
