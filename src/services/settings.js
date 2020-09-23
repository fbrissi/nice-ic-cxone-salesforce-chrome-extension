import { setStorage, getStorage } from './storage';

export const KEY = 'nice_ic_cxone_salesforce_settings';

export const getSettings = async () => getStorage(KEY, true);

export const setSettings = async (value) => setStorage(KEY, value, true);
