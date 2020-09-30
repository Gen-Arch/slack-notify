#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackNotifyStack } from '../lib/slack-notify-stack';

const disaster = process.env.WEBHOOK_DISASTER
const alart    = process.env.WEBHOOK_ALART
const error    = process.env.WEBHOOK_ERROR
const warning  = process.env.WEBHOOK_WARNIG

const env = {
  region: process.env.CDK_DEFAULT_REGION
}

const app = new cdk.App();
new SlackNotifyStack(app, 'SlackNotifyStack', { env: env });
