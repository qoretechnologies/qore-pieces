import { IResponseTicketInterface, IUpdateCreateTicketInterface } from 'zendesk/models/tickets';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';
import { TQorePartialActionWithFunction } from 'global/models/qore';

interface ICreateTicket {
  ticketCreate: IUpdateCreateTicketInterface;
}

// Defining a function to create a ticket
const createTicket = async ({ ticketCreate }: ICreateTicket) => {
  try {
    const data: IResponseTicketInterface = await zendeskRequest('/tickets', 'POST', {
      ticket: ticketCreate,
    });
    return data;
  } catch (error) {
    console.error('Error creating ticket:', error);
    throw error;
  }
};

export default {
  action: 'create_ticket',
  app_function: createTicket,
  options: {
    ticketCreate: ZendeskOptions.tickets.ticketCreateUpdate,
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
      display_name: 'Ticket ID',
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
