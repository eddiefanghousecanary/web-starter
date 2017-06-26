import React from 'react';
import { Layout, Panel, AppBar } from 'react-toolbox';
import styles from './client.css';

const ClientLayout = (Wrapped : any, Header : any, appBarClass : string) => {
  return (props : any) => (
    <Layout>
      <AppBar flat fixed className={`${styles.appBar} ${appBarClass}`}>
        <Header />
      </AppBar>
      <Panel>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Wrapped {...props} />
        </div>
      </Panel>
    </Layout>
  );
};

export default ClientLayout;
