// @flow
/* globals FormData */
import fetch from 'isomorphic-fetch';

var SETTINGS = window.SETTINGS;

const createOrderPath = () => `/client-api/v1/orders/csv`;
const getOrdersPath = (page, pageSize = 10) => `/client-api/v1/orders/?page=${page}&page_size=${pageSize}`;
const getOrderPath = (id) => `/client-api/v1/orders/${id}/`;

export function LoginRequiredError (message : ?string) {
  this.name = 'LoginRequiredError';
  this.message = message || 'Login Required';
  this.stack = (new Error()).stack;
}
LoginRequiredError.prototype = Object.create(Error.prototype);
LoginRequiredError.prototype.constructor = LoginRequiredError;

export function ValidationError (data : {[key: string]: any}) {
  this.name = 'ValidationError';
  this.message = 'Validation error';
  this.data = data;
  this.stack = (new Error()).stack;
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.constructor = ValidationError;

export function ServerError (message : ?string) {
  this.name = 'ServerError';
  this.message = message || 'Internal server error';
  this.stack = (new Error()).stack;
}
ServerError.prototype = Object.create(Error.prototype);
ServerError.prototype.constructor = ServerError;

function maybeThrowApiError (response) {
  if (response.status === 401) {
    throw new LoginRequiredError();
  } else if (response.status === 204) {
    return {};
  } else if (response.status !== 200 && response.status !== 201) {
    return response.text().then(text => {
      throw new ServerError(text);
    });
  }
}

export class Client {
  apiUrl : string;
  token : string;

  constructor (token : string) {
    this.apiUrl = SETTINGS.SERVER_URL;
    this.token = token;
  }

  createNewOrder (data : FormData) {
    const url = `${this.apiUrl}${createOrderPath()}`;
    return Promise.resolve({name: 'hi'});

    /*
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.token}`
      },
      body: data
    }).then(response => {
      if (response.status === 400) {
        return response.json().then(data => {
          throw new ValidationError(data);
        });
      }
      return maybeThrowApiError(response) || response.json();
    });
    */
  }

  getOrders (page : number = 1, status : ?string = null) {
    let url = `${this.apiUrl}${getOrdersPath(page)}`;
    if (status) {
      url += `&status=${status}`;
    }
    return Promise.resolve({links: [], data: [{
      name: 'test data'
    }]});
    /*
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json().then(data => {
        return {
          data
        };
      });
    });
    */
  }

  getOrderDetails (id : string) {
    let url = `${this.apiUrl}${getOrderPath(id)}`;
    return Promise.resolve({name: 'hi'});
    /*
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json();
    });
    */
  }
}
