export const API_BASE_URL = 'http://localhost:8080/api';

export const ApiEndpoints = {
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  CHECK: '/check',
  USERS: '/users',
  NOTES: '/notes',
  TODOS: '/todos',
};

export const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const AccessMode = {
  AUTH: 'AUTH',
  UNAUTH: 'UNAUTH',
  ALL: 'ALL',
};

export const StorageKeys = {
  TOKEN: 'token',
};

export const Paths = {
  HOME: '/',
  NOTES: '/notes',
  TODOS: '/todos',
  AUTH: '/auth',
  ACCOUNT: '/account',
};

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 100;

export const NOTE_TITLE_MIN_LENGTH = 1;
export const NOTE_TITLE_MAX_LENGTH = 100;
export const NOTE_CONTENT_MIN_LENGTH = 1;
export const NOTE_CONTENT_MAX_LENGTH = 500;

export const TODO_TITLE_MIN_LENGTH = 1;
export const TODO_TITLE_MAX_LENGTH = 100;
