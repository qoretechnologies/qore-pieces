import { slackSendMessage } from '../common/utils';
import { slackAuth } from '../..';
import { profilePicture, slackChannel, slackInfo, text, username } from '../common/props';
import { createAction } from '../../../core/framework';
import { ExecutionType } from '../../../core/shared/flow-run/execution/execution-output';
import { PauseType } from '../../../core/shared/flow-run/execution/flow-execution';
import { assertNotNullOrUndefined } from '../../../core/shared/common';

export const requestSendApprovalMessageAction = createAction({
  auth: slackAuth,
  name: 'request_approval_message',
  displayName: 'Request Approval in a Channel',
  description: 'Send approval message to a channel and then wait until the message is approved or disapproved',
  props: {
    info: slackInfo,
    channel: slackChannel(true),
    text,
    username,
    profilePicture,
  },
  async run(context) {
    if (context.executionType === ExecutionType.BEGIN) {
      context.run.pause({
        pauseMetadata: {
          type: PauseType.WEBHOOK,
          response: {},
        },
      });
      const token = context.auth.access_token;
      const { channel, username, profilePicture } = context.propsValue;

      assertNotNullOrUndefined(token, 'token');
      assertNotNullOrUndefined(text, 'text');
      assertNotNullOrUndefined(channel, 'channel');
      const approvalLink = context.generateResumeUrl({
        queryParams: { action: 'approve' },
      });
      const disapprovalLink = context.generateResumeUrl({
        queryParams: { action: 'disapprove' },
      });

      await slackSendMessage({
        token,
        text: `${context.propsValue.text}\n\nApprove: ${approvalLink}\n\nDisapprove: ${disapprovalLink}`,
        username,
        profilePicture,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${context.propsValue.text}`,
            },
          },
          {
            type: 'actions',
            block_id: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Approve',
                },
                style: 'primary',
                url: approvalLink,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: 'Disapprove',
                },
                style: 'danger',
                url: disapprovalLink,
              },
            ],
          },
        ],
        conversationId: channel,
      });

      return {
        approved: false, // default approval is false
      };
    } else {
      return {
        approved: context.resumePayload.queryParams['action'] === 'approve',
      };
    }
  },
});
