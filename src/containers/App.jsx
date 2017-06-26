// @flow
import React from 'react';
import { connect } from 'react-redux';

import { ROUTES } from '../routes';
import Loading from './Loading.jsx';

export const VIEWS : {[key : string]: any} = Object.keys(ROUTES).reduce((views, key) => {
  const def = ROUTES[key];
  views[def.id] = def.view;
  return views;
}, {});

const ContentView = connect(state => ({
  selectedView: state.view.currentView,
  loading: state.view.loading
}))(({selectedView, loading, params}) => {
  if (loading) {
    return <Loading />;
  }
  const View = VIEWS[selectedView];
  return <View />;
});

export default class App extends React.Component {
  render () {
    return (
      <ContentView />
    );
  }
}
