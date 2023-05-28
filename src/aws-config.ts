import aws from "aws-sdk";

aws.config.update({
  region: "us-east-1",
  credentials: {
    accessKeyId: "", // put here your Access Key
    secretAccessKey: "", // put here your Secret Access Key
  },
});

export const sns = new aws.SNS();
