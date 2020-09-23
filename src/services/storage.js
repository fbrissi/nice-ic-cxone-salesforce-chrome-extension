export const getStorage = async (key, sync = false) => {
  if (process.env.NODE_ENV === 'production') {
    return (await browser.storage[sync ? 'sync' : 'local'].get(key))[key];
  }

  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : undefined;
};

export const setStorage = async (key, value, sync = false) => {
  if (process.env.NODE_ENV === 'production') {
    return browser.storage[sync ? 'sync' : 'local'].set({ [key]: value });
  }

  return localStorage.setItem(key, JSON.stringify(value));
};

export const cleanStorage = async (key, sync = false) => {
  if (process.env.NODE_ENV === 'production') {
    return browser.storage[sync ? 'sync' : 'local'].set({ [key]: undefined });
  }

  return localStorage.setItem(key, '');
};
