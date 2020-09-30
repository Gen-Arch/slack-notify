import * as Slack from 'typed-slack'

const disaster = new Slack.IncomingWebhook(process.env.WEBHOOK_DISASTER)
const alart    = new Slack.IncomingWebhook(process.env.WEBHOOK_ALART)
const error    = new Slack.IncomingWebhook(process.env.WEBHOOK_ERROR)

const handler = async function (event: any, context: any) {
  console.log(event)
  console.log(context)

  let message = event["Records"][0]["Sns"]["Message"]

  await disaster.send(alarm(message))
  await disaster.send(ok(message))
}

function alarm(message: string): Slack.IncomingWebhookOptions {
  let options = <Slack.IncomingWebhookOptions>{
    text: message,
    channel: 'bot-test',
    icon_emoji: ':rage:',
    link_names: 1,
    attachments: [
      {
        color: Slack.Color.Danger,
        fields: [
          {
            title: 'Alarm',
            value: 'test alarm',
            short: true
          }
        ],
      }
    ]
  }

  return options
}

function ok(message: string): Slack.IncomingWebhookOptions {
  let options = <Slack.IncomingWebhookOptions>{
    text: message,
    channel: 'bot-test',
    icon_emoji: ':smile:',
    link_names: 1,
    attachments: [
      {
        color: Slack.Color.Good,
        fields: [
          {
            title: 'OK',
            value: 'test alarm',
            short: true
          }
        ],
      }
    ]
  }

  return options
}

export { handler }
