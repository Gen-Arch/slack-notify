import * as cdk    from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns    from '@aws-cdk/aws-sns';
import * as events from '@aws-cdk/aws-events';

export class SlackNotifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const slack_topic = new sns.Topic(this, "slack-notify-topic", {
      topicName: "slack-notify-topic"
    })

    const slack_notify = new lambda.Function(this, 'slack-notify-lamda', {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.asset("src"),
      handler: 'slack-notify.handler',
      timeout: cdk.Duration.seconds(60),
      environment: {
        WEBHOOK_DISASTER: process.env.WEBHOOK_DISASTE,
        WEBHOOK_ALART:    process.env.WEBHOOK_ALART,
        WEBHOOK_ERROR:    process.env.WEBHOOK_ERROR
      }
    });
  }
}
