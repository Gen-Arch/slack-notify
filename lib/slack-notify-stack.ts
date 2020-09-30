import * as cdk    from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns    from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class SlackNotifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const topic = new sns.Topic(this, "slack-notify-topic")

    const slack_notify = new lambda.Function(this, 'slack-notify-lamda', {
      runtime:  lambda.Runtime.NODEJS_12_X,
      code:     lambda.Code.asset("src"),
      handler:  'slack-notify.handler',
      timeout:  cdk.Duration.seconds(60),
      environment: {
        WEBHOOK_DISASTER: disaster,
        WEBHOOK_ALART:    alart,
        WEBHOOK_ERROR:    error,
        WEBHOOK_WARNIG:   warning
      }
    });

    slack_notify.addEventSource(new SnsEventSource(topic))
  }
}
