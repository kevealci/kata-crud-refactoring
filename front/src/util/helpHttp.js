const customFetch = (endpoint, options) => {
  const defaultHeader = {
    'Content-Type': 'application/json'
  };

  const controller = new AbortController();
  options.signal = controller.signal;

  options.method = options.method || 'GET';
  options.headers = options.headers ? { ...defaultHeader, ...options.headers } : defaultHeader;

  options.body = JSON.stringify(options.body) || false;
  if (!options.body) delete options.body;

  setTimeout(() => controller.abort(), 20000);

  return fetch(endpoint, options)
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'Ocurrió un error'
          })
    )
    .catch((err) => err);
};

export const get = (url, options = {}) => customFetch(url, options);

export const post = (url, options = {}) => {
  options.method = 'POST';
  return customFetch(url, options);
};

export const put = (url, options = {}) => {
  options.method = 'PUT';
  return customFetch(url, options);
};

export const del = (url, options = {}) => {
  options.method = 'DELETE';
  return customFetch(url, options);
};
