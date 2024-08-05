import { ITicketInterface, ITicketsVariantType } from "zendesk/models/tickets";
import { zendeskRequest } from "../../client";

interface IGetTicket {
    ticketId: number,
    variant?: ITicketsVariantType
}

// Defining a function to fetch ticket by id
export const getTicket = async ({ ticketId, variant }: IGetTicket) => {
    try {
        const data: ITicketInterface | ITicketInterface[] = await zendeskRequest(`/tickets/${ticketId}${variant ? `/${variant}` : ''}.json`, 'GET');
        return data;
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
};