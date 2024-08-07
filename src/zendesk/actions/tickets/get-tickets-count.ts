import { ITicketsCountInterface } from 'zendesk/models/tickets';
import { zendeskRequest } from '../../client';
import { TQorePartialActionWithFunction } from 'global/models/qore';

// Defining a function to fetch tickets
const getTicketsCount = async () => {
  try {
    const data: ITicketsCountInterface = await zendeskRequest(`/tickets/count.json`, 'GET');
    return data;
  } catch (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }
};

export default {
  action: 'get_ticket_count',
  app_function: getTicketsCount,
  options: null,
  response_type: {
    count: {
      display_name: 'Count',
      short_desc: 'Tickets count',
      desc: 'Count of the all tickets',
      name: 'count',
      example_value: 55,
      type: 'number',
    },
  },
} satisfies TQorePartialActionWithFunction;
