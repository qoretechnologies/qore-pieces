import { TQorePartialActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';

interface IDeleteTicket {
  ticketId: number;
}

// Defining a function to delete ticket
const deleteTicket = async ({ ticketId }: IDeleteTicket) => {
  try {
    const data = await zendeskRequest(`/tickets/${ticketId}.json`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error delete ticket:', error);
    throw error;
  }
};

export default {
  action: 'delete_ticket',
  app_function: deleteTicket,
  options: null,
  response_type: null,
} satisfies TQorePartialActionWithFunction;
