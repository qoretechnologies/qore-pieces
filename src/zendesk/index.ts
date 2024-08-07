import { mapActionsToApp } from '../global/helpers';
import { IQoreAppWithActions } from '../global/models/qore';
import L from '../i18n/i18n-node';
import { Locales } from '../i18n/i18n-types';
import * as zendeskActions from './actions';

/*
 * Returns the app object with all the actions ready to use, using translations
 * @param locale - the locale
 * @returns IQoreAppWithActions
 */
export default (locale: Locales) =>
  ({
    display_name: L[locale].apps.zendesk.displayName(),
    short_desc: L[locale].apps.zendesk.shortDesc(),
    name: 'zendesk',
    // @ts-expect-error typescript will complain about "zendeskAction" because most of the actions are still missing `options` and `action` fields
    actions: mapActionsToApp('zendesk', zendeskActions, locale),
    desc: L[locale].apps.zendesk.longDesc(),
  }) as IQoreAppWithActions;
