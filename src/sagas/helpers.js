// @flow

import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';

var SETTINGS = window.SETTINGS;

const loginRedirectUrl = `${SETTINGS.ACCOUNT_MANAGER_URL}/login?redirect_url=`;
const selectTeamRedirectUrl = `${SETTINGS.ACCOUNT_MANAGER_URL}/select-team?redirect_url=`;

export function redirectToLogin () {
  window.location.replace(`${loginRedirectUrl}${window.encodeURIComponent(window.location)}`);
}

export function redirectToSelectTeam () {
  window.location.replace(`${selectTeamRedirectUrl}${window.encodeURIComponent(window.location)}`);
}

export function handleStandardExceptions (e : any) {
  if (e.name === 'LoginRequiredError') {
    redirectToLogin();
  }
}

export function camelToSnake (source : {[key: string]: any}, fields : string[], target : {[key: string]: any} = {}, omitNull : boolean = true) {
  for (const field of fields) {
    const value = source[field];
    if (omitNull && value == null) {
      continue;
    }
    target[snakeCase(field)] = value;
  }
  return target;
}

export function snakeToCamel (source : {[key: string]: any}, fields : string[], target : {[key: string]: any} = {}, omitNull : boolean = true) {
  for (const field of fields) {
    const value = source[field];
    if (omitNull && value == null) {
      continue;
    }
    target[camelCase(field)] = value;
  }
  return target;
}
