import * as cdk    from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns    from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { CfnOutput } from '@aws-cdk/core';

export class SlackNotifyStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CfnOutput(this, "account", {value: this.account})
    new CfnOutput(this, "region",  {value: this.region})

    const hooks = this.node.tryGetContext("hooks")
    const topic = new sns.Topic(this, "slack-notify-topic")

    const lmd = new lambda.Function(this, 'slack-notify-lamda', {
      runtime:  lambda.Runtime.RUBY_2_7,
      code:     lambda.Code.fromAsset("src/sample"),
      handler:  'slack-notify.handler',
      timeout:  cdk.Duration.seconds(60),
      environment: {
        WEBHOOK_EMERG: hooks["emerg"],
        WEBHOOK_ALART: hooks["alart"],
        WEBHOOK_CRIT:  hooks["crit"],
        WEBHOOK_ERR:   hooks["err"],
        WEBHOOK_WARN:  hooks["warn"],
        TZ:            "Asia/Tokyo"
      }
    });

    lmd.addEventSource(new SnsEventSource(topic))
  }
}
