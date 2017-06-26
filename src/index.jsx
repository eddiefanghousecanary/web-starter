import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppContainer } from 'react-hot-loader';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { sagaMiddleware, runSagas } from './sagas';
import rootReducer from './reducers';
import App from './containers/App';

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

runSagas();

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.querySelector('#app')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./containers/App', () => { render(App); });
  module.hot.accept('./reducers', () => { store.replaceReducer(rootReducer); });
}
