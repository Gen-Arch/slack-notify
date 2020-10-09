# frozen_string_literal: true

require 'json'
require 'logger'
require 'colorable'
require 'slack/incoming/webhooks'

def handler(event:, context:)
  # debug info
  @logger = logging
  @logger.info(event)
  @logger.info(context)

  # parse alm
  alm   = event['Records'][0]['Sns']['Message']
  alm   = JSON.parse(alm)
  alarm = alm['AlarmName']

  # options
  opts = {}
  opts[:text]  = alm['NewStateReason']
  opts[:color] = alm['NewStateValue'] == 'OK' ? :greeen : :red

  # send slack
  notify alarm, opts
end

# args
# * alarm   => alarm message
# option sample:
# * :color      => RGB color ->  :red, :green, :bleu...etc
# * :text       => "Optional text that appears within the attachment",
def notify(alram, opts = { color: :red })
  url = ENV['WEBHOOK']

  attachs         = {}
  attachs[:title] = alram
  attachs[:text]  = "```#{opts[:text]}```" if opts[:text]
  attachs[:color] = colors(opts[:color])

  slack          = Slack::Incoming::Webhooks.new url
  slack.channel  = '#bot-test'
  slack.username = 'aws-notify'
  slack.post '', attachments: [attachs]
end

def colors(col)
  @colors ||= {}
  unless @colors[col]
    c = Colorable::Color.new col
    @colors[col] = c.hex
  end

  @colors[col]
end

def logging(io = STDOUT)
  logger                 = Logger.new(io)
  logger.datetime_format = '%Y-%m-%d %H:%M:%S'
  logger.level           = Logger::Severity::INFO
  logger
end
