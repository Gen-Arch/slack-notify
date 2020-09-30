import * as cdk    from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns    from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';

export class SlackNotifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const hooks = this.node.tryGetContext("hooks")

    const topic = new sns.Topic(this, "slack-notify-topic")

    const lmd = new lambda.Function(this, 'slack-notify-lamda', {
      runtime:  lambda.Runtime.RUBY_2_7,
      code:     lambda.Code.fromAsset("src"),
      handler:  'slack-notify.handler',
      timeout:  cdk.Duration.seconds(60),
      environment: {
        WEBHOOK_DISASTER: hooks["disaster"],
        WEBHOOK_ALART:    hooks["alart"],
        WEBHOOK_ERROR:    hooks["error"],
        WEBHOOK_WARNIG:   hooks["warning"],
      }
    });

    lmd.addEventSource(new SnsEventSource(topic))
  }
}
