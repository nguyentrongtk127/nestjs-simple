export function formatRequestDataToString(params) {
  return Object.keys(params)
    .map(
      (key) =>
        `${key}=${
          typeof params[key] === 'object'
            ? JSON.stringify(params[key]).toString()
            : params[key]
        }`,
    )
    .join('&');
}
