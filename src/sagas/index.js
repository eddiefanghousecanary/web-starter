import createSagaMiddleware from 'redux-saga';
import { routerSaga } from './router.saga';
import { createOrderSaga } from './client-dashboard.saga';

export const sagaMiddleware = createSagaMiddleware();

export function runSagas () {
  sagaMiddleware.run(routerSaga);
  sagaMiddleware.run(createOrderSaga);
}
