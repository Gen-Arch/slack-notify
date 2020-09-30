#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackNotifyStack } from '../lib/slack-notify-stack.ts';

const app = new cdk.App();
new SlackNotifyStack(app, 'SlackNotifyStack');
