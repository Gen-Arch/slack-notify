#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackNotifyStack } from '../lib/slack-notify-stack';
import { CloudWatchStack } from  '../lib/cloudwatch-stack';

const env = { account: process.env.CDK_DEPLOY_ACCOUNT, region: process.env.CDK_DEPLOY_REGION }

const app = new cdk.App();
new SlackNotifyStack(app, 'SlackNotifyStack', { env: env });
new CloudWatchStack(app,  'CloudWatchStack',  { env: env });