import { TQorePartialActionWithFunction } from 'global/models/qore';
import { ITicketInterface, ITicketsVariantType } from 'zendesk/models/tickets';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IGetTicket {
  ticketId: number;
  variant?: ITicketsVariantType;
}

// Defining a function to fetch ticket by id
const getTicket = async ({ ticketId, variant }: IGetTicket) => {
  try {
    const data: ITicketInterface | ITicketInterface[] = await zendeskRequest(
      `/tickets/${ticketId}${variant ? `/${variant}` : ''}.json`,
      'GET'
    );
    return data;
  } catch (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }
};

export default {
  action: 'get_ticket',
  app_function: getTicket,
  options: {
    ticketId: ZendeskOptions.tickets.ticketId,
    variant: ZendeskOptions.tickets.variant
  },
  response_type: {
    created_at: {
      display_name: 'Created At',
      short_desc: 'The date and time the ticket was created',
      desc: 'The date and time the ticket was created',
      name: 'created_at',
      example_value: '2021-08-25T09:00:00Z',
      type: '*date',
    },
    id: {
      type: '*number',
      name: 'id',
      display_name: 'ticket ID',
      short_desc: 'The unique identifier for the ticket',
      desc: 'The unique identifier for the ticket',
      example_value: 123,
    },
    name: {
      type: '*string',
      name: 'name',
      display_name: 'Name',
      short_desc: 'The ticket’s name',
      desc: 'The ticket’s name',
      example_value: 'Ticket #1',
    },
  },
} satisfies TQorePartialActionWithFunction;
