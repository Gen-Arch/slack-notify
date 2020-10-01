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
  alm   = event["Records"][0]["Sns"]["Message"]
  alm   = JSON.parse(alm)
  level = alm["level"].to_sym
  msg   = alm["message"]

  # options
  opts  = Hash.new
  opts[:text ] = alm["text" ] if alm["text" ]
  opts[:color] = alm["color"] if alm["color"]


  # send slack
  notify level, msg, opts
end

# args
# * level => alarm level
# * msg   => alarm message
# option sample:
# * :color      => RGB color ->  :red, :green, :bleu...etc
# * :text       => "Optional text that appears within the attachment",
def notify(level, alram, opts = { color: :red })
  url          = hook(level)

  attachs         = Hash.new
  attachs[:title] = alram
  attachs[:text]  = "```#{opts[:text]}```" if opts[:text]
  attachs[:color] = colors(opts[:color])

  slack          = Slack::Incoming::Webhooks.new url
  slack.channel  = "#bot-test"
  slack.username = "aws-notify"
  slack.post "", attachments: [attachs]
end

def hook(type)
  case type
  when :emerg then ENV['WEBHOOK_EMERG']
  when :alart then ENV['WEBHOOK_ALART']
  when :crit  then ENV['WEBHOOK_CRIT' ]
  when :error then ENV['WEBHOOK_ERROR']
  when :warn  then ENV['WEBHOOK_WARN' ]
  end
end

def colors(col)
  @colors ||= Hash.new
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
