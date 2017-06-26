import createSagaMiddleware from 'redux-saga';
import { routerSaga } from './router.saga';
import { acceptOrderSaga } from './accept-order.saga';
import { createOrderSaga, reviewAcceptOrderSaga, reviewRejectOrderSaga } from './client-dashboard.saga';

export const sagaMiddleware = createSagaMiddleware();

export function runSagas () {
  sagaMiddleware.run(routerSaga);
  sagaMiddleware.run(acceptOrderSaga);
  sagaMiddleware.run(createOrderSaga);
  sagaMiddleware.run(reviewAcceptOrderSaga);
  sagaMiddleware.run(reviewRejectOrderSaga);
}
