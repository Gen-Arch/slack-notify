import * as cdk    from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as sns    from '@aws-cdk/aws-sns';
import { SnsEventSource } from '@aws-cdk/aws-lambda-event-sources';
import { CfnOutput } from '@aws-cdk/core';

export class CloudWatchStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CfnOutput(this, "account", {value: this.account})
    new CfnOutput(this, "region",  {value: this.region})

    const hooks: {key: string} = this.node.tryGetContext("hooks")

    for (let [name, hook] of Object.entries(hooks)){
      const topic = new sns.Topic(this, `slack-notify-cloudwatch-${name}-topic`, {topicName: `slack-notify-cloudwatch-${name}-topic`})

      const lmd = new lambda.Function(this, `slack-notify-cloudwatch-${name}-lamda`, {
        functionName: `slack-notify-cloudwatch-${name}-lamda`,
        runtime:  lambda.Runtime.RUBY_2_7,
        code:     lambda.Code.fromAsset("src/cloudwatch"),
        handler:  'slack-notify.handler',
        timeout:  cdk.Duration.seconds(60),
        environment: {
          WEBHOOK: hook,
          TZ:      "Asia/Tokyo"
        }
      });
      lmd.addEventSource(new SnsEventSource(topic))
    }
  }
}
