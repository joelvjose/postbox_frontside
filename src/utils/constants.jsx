// production
// export const BASE_URL = 'http://54.210.224.99'

const Protocol = window.location.protocol;
const BaseDomain = 'postbox.joeje.shop';
const BASE_URL = `${Protocol}//${BaseDomain}`;

export {BASE_URL};

// local machine
// export const BASE_URL = 'http://localhost:8000'