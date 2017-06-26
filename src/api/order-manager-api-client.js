// @flow
/* globals FormData */
import fetch from 'isomorphic-fetch';
import parseLinkHeader from 'parse-link-header';

var SETTINGS = window.SETTINGS;

const acceptOrderPath = orderId => `/partner-api/v1/valuation-orders/${orderId}/accept`;
const createOrderPath = () => `/client-api/v1/orders/csv`;
const getOrdersPath = (page, pageSize = 10) => `/client-api/v1/orders/?page=${page}&page_size=${pageSize}`;
const getOrderPath = (id) => `/client-api/v1/orders/${id}/`;
const getOrderItemsPath = (orderId, page, pageSize = 10) => `/client-api/v1/orders/${orderId}/items/?page=${page}&page_size=${pageSize}`;
const getReviewAcceptOrderPath = (orderId) => `/client-api/v1/orders/${orderId}/accept`;
const getReviewRejectOrderPath = (orderId) => `/client-api/v1/orders/${orderId}/reject`;

export function OrderNotFoundError (message : ?string) {
  this.name = 'OrderNotFoundError';
  this.message = message || 'Order not found';
  this.stack = (new Error()).stack;
}
OrderNotFoundError.prototype = Object.create(Error.prototype);
OrderNotFoundError.prototype.constructor = OrderNotFoundError;

export function OrderNotAvailableError (message : ?string) {
  this.name = 'OrderNotAvailableError';
  this.message = message || 'Order not available';
  this.stack = (new Error()).stack;
}
OrderNotAvailableError.prototype = Object.create(Error.prototype);
OrderNotAvailableError.prototype.constructor = OrderNotAvailableError;

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
  } else if (response.status === 404) {
    throw new OrderNotFoundError();
  } else if (response.status === 409) {
    throw new OrderNotAvailableError();
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
    this.apiUrl = SETTINGS.ORDER_MANAGER_URL;
    this.token = token;
  }

  getAcceptOrderDetails (orderId : string) {
    const url = `${this.apiUrl}${acceptOrderPath(orderId)}`;
    return fetch(url, {
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json();
    });
  }

  submitAcceptOrder (orderId : string) {
    const url = `${this.apiUrl}${acceptOrderPath(orderId)}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.token}`
      },
      data: {id: orderId}
    }).then(response => {
      return maybeThrowApiError(response) || response.json();
    });
  }

  createNewOrder (data : FormData) {
    const url = `${this.apiUrl}${createOrderPath()}`;
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
  }

  reviewAcceptOrder (orderId : string) {
    const url = `${this.apiUrl}${getReviewAcceptOrderPath(orderId)}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      console.log('review accept order');
      console.log(response);
      return maybeThrowApiError(response) || response.json();
    });
  }

  reviewRejectOrder (orderId : string) {
    const url = `${this.apiUrl}${getReviewRejectOrderPath(orderId)}`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json();
    });
  }

  getOrders (page : number = 1, status : ?string = null) {
    let url = `${this.apiUrl}${getOrdersPath(page)}`;
    if (status) {
      url += `&status=${status}`;
    }
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json().then(data => {
        return {
          links: parseLinkHeader(response.headers.get('Link')),
          data
        };
      });
    });
  }

  getOrderDetails (id : string) {
    let url = `${this.apiUrl}${getOrderPath(id)}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json();
    });
  }

  getOrderItems (orderId : string, page : number = 1) {
    let url = `${this.apiUrl}${getOrderItemsPath(orderId, page)}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${this.token}`
      }
    }).then(response => {
      return maybeThrowApiError(response) || response.json().then(data => {
        return {
          links: parseLinkHeader(response.headers.get('Link')),
          data
        };
      });
    });
  }
}
