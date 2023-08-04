
type IKeyStore = 'token';

const session = {
  set: (keyValue: IKeyStore, value: string) => {
    return sessionStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return sessionStorage.getItem(keyValue);
  },
};

const local = {
  set: (keyValue: IKeyStore, value: string) => {
    return localStorage.setItem(keyValue, value);
  },

  get: (keyValue: IKeyStore) => {
    return localStorage.getItem(keyValue);
  },
};

const genGetSetKeyLocal = (key: IKeyStore) => ({
  get: () => local.get(key) ?? '',
  set: (value: string) => local.set(key, value),
});

const genGetSetKeySession = (key: IKeyStore) => ({
  get: () => session.get(key) ?? '',
  set: (value: string) => session.set(key, value),
});

const storage = {
  get: session.get,
  set: session.set,
  genGetSetKeyLocal,
  genGetSetKeySession,
  token: genGetSetKeyLocal('token'),
};

export default storage;
