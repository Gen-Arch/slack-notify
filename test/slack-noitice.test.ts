import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SlackNoitice from '../lib/slack-noitice-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SlackNoitice.SlackNoiticeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
