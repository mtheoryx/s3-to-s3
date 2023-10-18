import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class S3ToS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Source Bucket
    const sourceBucket = new s3.Bucket(this, "sourceBucket", {
      bucketName: "drp-sandbox-appelow-cdk-source",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // Destination Bucket
    const destinationBucket = new s3.Bucket(this, "destinationBucket", {
      bucketName: "drp-sandbox-appelow-cdk-destination",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      autoDeleteObjects: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    // Source File to add to Source Bucket
    new s3deploy.BucketDeployment(this, "DeploySource", {
      sources: [s3deploy.Source.asset("./assets")],
      destinationBucket: sourceBucket,
    });
  }
}
