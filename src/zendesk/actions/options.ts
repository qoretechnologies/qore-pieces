import { IQoreAppActionOption } from 'global/models/qore';

export const ZendeskOptions = {
  users: {
    userCreateUpdate: {
      display_name: 'User Create/Update',
      short_desc: 'Payload of userCreate/userUpdate',
      desc: 'The payload of userCreate/userUpdate',
      type: 'data',
      required: true,
      example_value: {
        name: {
          display_name: 'Name',
          short_desc: 'Name of user',
          desc: 'Name of user',
          type: 'string',
          required: true,
          example_value: 'John Doe',
        }
      },
    },
    userId: {
      display_name: 'User ID',
      short_desc: 'User ID',
      desc: 'User ID',
      type: 'number',
      required: true,
      example_value: 123,
    },
    count: {
      display_name: 'Count',
      short_desc: 'Count',
      desc: 'Count',
      type: 'boolean',
      required: false,
      example_value: true,
    },
    showMandyIds: {
      display_name: 'Show Many Tickets',
      short_desc: 'Show Many Tickets',
      desc: 'Show Many Tickets',
      type: 'string',
      required: false,
      example_value: '10,5,22',
    },
    type: {
      display_name: 'User Type',
      short_desc: 'User Type',
      desc: 'User Type',
      type: 'string',
      required: false,
      example_value: 'followers',
    },
  },
  attachments: {
    token: {
      display_name: 'Token',
      short_desc: 'Token',
      desc: 'Token',
      type: 'string',
      required: true,
      example_value: '44adee',
    }
  },
  groups: {
    groupCreateUpdate: {
      display_name: 'Group Create/Update',
      short_desc: 'Payload of groupCreate/groupUpdate',
      desc: 'The payload of groupCreate/groupUpdate',
      type: 'data',
      required: true,
      example_value: {
        name: {
          display_name: 'Name',
          short_desc: 'Name of group',
          desc: 'Name of group',
          type: 'string',
          required: true,
          example_value: 'Group #1',
        }
      },
    },
    groupId: {
      display_name: 'Group ID',
      short_desc: 'Id of group',
      desc: 'Id of group',
      type: '*number',
      required: true,
      example_value: 123,
    }
  },
  organization: {
    organizationId: {
      display_name: 'Organization ID',
      short_desc: 'Organization ID',
      desc: 'Organization ID',
      type: 'number',
      required: true,
      example_value: 123,
    },
    organizationCreateUpdate: {
      display_name: 'Organization Create/Update',
      short_desc: 'Payload of organizationCreate/organizationUpdate',
      desc: 'The payload of organizationCreate/organizationUpdate',
      type: 'data',
      required: true,
      example_value: {
        name: {
          display_name: 'Name',
          short_desc: 'Name of organization',
          desc: 'Name of organization',
          type: 'string',
          required: true,
          example_value: 'Organization #1',
        }
      },
    },
    count: {
      display_name: 'Count',
      short_desc: 'Count',
      desc: 'Count',
      type: 'boolean',
      required: false,
      example_value: true,
    }
  },
  tickets: {
    ticketCreateUpdate: {
      display_name: 'Ticket Create/Update',
      short_desc: 'Payload of ticketCreate/ticketUpdate',
      desc: 'The payload of ticketCreate/ticketUpdate',
      type: 'data',
      required: true,
      example_value: {
        name: {
          display_name: 'Name',
          short_desc: 'Name of ticket',
          desc: 'Name of ticket',
          type: 'string',
          required: true,
          example_value: 'Ticket #1',
        }
      },
    },
    ticketId: {
      display_name: 'Ticket ID',
      short_desc: 'Ticket ID',
      desc: 'Ticket ID',
      type: 'number',
      required: true,
      example_value: 123,
    },
    variant: {
      display_name: 'Ticket Variant',
      short_desc: 'Ticket Variant',
      desc: 'Ticket Variant',
      type: 'string',
      required: false,
      example_value: 'followers',
    },
    onlyDeleted: {
      display_name: 'Deleted Tickets',
      short_desc: 'Deleted Tickets',
      desc: 'Show only deleted tickets?',
      type: 'boolean',
      required: false,
      example_value: true,
    }
  },
} satisfies Record<string, Record<string, IQoreAppActionOption>>;
