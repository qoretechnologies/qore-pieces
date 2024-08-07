import { TQorePartialActionWithFunction } from 'global/models/qore';
import { IAttachmentsInterface } from 'zendesk/models/attachments';
import { zendeskRequest } from '../../client';

// Defining a function to fetch attachments
const getAttachments = async () => {
  try {
    const data: IAttachmentsInterface = await zendeskRequest('/uploads.json', 'POST');
    return data;
  } catch (error) {
    console.error('Error fetching attachments:', error);
    throw error;
  }
};

export default {
  action: 'get_attachments',
  app_function: getAttachments,
  options: null,
  response_type: {
    attachments: {
      display_name: 'attachments',
      short_desc: 'All attachments',
      desc: 'Got the all available attachments',
      name: 'attachments',
      example_value: [],
      type: '*list',
    },
    next_page: {
      type: '*number',
      name: 'next_page',
      display_name: 'Next Page',
      short_desc: 'Next page number',
      desc: 'Next page number',
      example_value: 2,
    },
    previous_page: {
      type: '*number',
      name: 'previous_page',
      display_name: 'Previous Page',
      short_desc: 'Previous page number',
      desc: 'Previous page number',
      example_value: 1,
    },
    count: {
      type: '*number',
      name: 'count',
      display_name: 'Count',
      short_desc: 'The attachments count',
      desc: 'The attachments count',
      example_value: 10,
    },
  },
} satisfies TQorePartialActionWithFunction;
