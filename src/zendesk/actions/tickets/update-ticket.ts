import { IResponseTicketInterface, IUpdateCreateTicketInterface } from 'zendesk/models/tickets';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';
import { TQorePartialActionWithFunction } from 'global/models/qore';

interface IUpdateTicket {
  ticketId: number;
  ticketUpdate: IUpdateCreateTicketInterface;
}

// Defining a function to update a ticket
const updateTicket = async ({ ticketId, ticketUpdate }: IUpdateTicket) => {
  try {
    const data: IResponseTicketInterface = await zendeskRequest(
      `/tickets/${ticketId}.json`,
      'POST',
      {
        ticket: ticketUpdate,
      }
    );
    return data;
  } catch (error) {
    console.error('Error updating ticket:', error);
    throw error;
  }
};

export default {
  action: 'update_ticket',
  app_function: updateTicket,
  options: {
    ticketId: ZendeskOptions.tickets.ticketId,
    ticketUpdate: ZendeskOptions.tickets.ticketCreateUpdate,
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
