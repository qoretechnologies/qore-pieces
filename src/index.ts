import { TQoreApps } from 'global/models/qore';
import { Locales } from 'i18n/i18n-types';
import zendesk from './zendesk';

class _QorusAppsCatalogue {
  public readonly apps: TQoreApps = {};

  constructor(public locale: Locales = 'en') {}

  // Register all the apps here
  public registerApps() {
    this.apps['zendesk'] = zendesk(this.locale);
  }
}

export const QorusAppsCatalogue = new _QorusAppsCatalogue();
