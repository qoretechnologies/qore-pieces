import { IQoreAppActionWithFunction } from 'global/models/qore';
import { zendeskRequest } from '../../client';
import { ZendeskOptions } from '../options';

interface IDeleteAttachment {
  token: string;
}

// Defining a function to delete attachment
const deleteAttachment = async ({ token }: IDeleteAttachment) => {
  try {
    const data = await zendeskRequest(`/uploads/${token}`, 'DELETE');
    return data;
  } catch (error) {
    console.error('Error delete attachment:', error);
    throw error;
  }
};

export default {
  app_function: deleteAttachment,
  options: ZendeskOptions.attachments.token,
  response_type: null,
} as Pick<IQoreAppActionWithFunction, 'app_function' | 'response_type'>;
