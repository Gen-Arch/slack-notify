require 'logger'
require 'slack/incoming/webhooks'

def handler(event:, context:)
  logger = Logger.new(STDOUT)
  ms     = event["Records"][0]["Sns"]["Message"]

  # debug info
  logger.info(event)
  logger.info(context)

  # send slack
  notify :disaster, ms

  notify :disaster, ms, {
    :color => :green,
    :text  => "hello world!!"
  }
end

# option sample:
# * :color      => :red | :green,
# * :text       => "Optional text that appears within the attachment",
def notify(type, alram, opts = { color: :red })
  url          = hook(type)

  attachs           = Hash.new
  attachs[:title]   = alram
  attachs[:text] = "```#{opts[:text]}```" if opts[:text]
  attachs[:color]   = colors[opts[:color]]

  slack          = Slack::Incoming::Webhooks.new url
  slack.channel  = "#bot-test"
  slack.username = "aws-notify"
  slack.post "", attachments: [attachs]
end


def hook(type)
  case type
  when :disaster then ENV['WEBHOOK_DISASTER']
  when :alart    then ENV['WEBHOOK_ALART'   ]
  when :error    then ENV['WEBHOOK_ERROR'   ]
  when :warning  then ENV['WEBHOOK_WARNING' ]
  end
end

def colors
  {
    red:   '#ff0000',
    green: '#36a64f'
  }
end
