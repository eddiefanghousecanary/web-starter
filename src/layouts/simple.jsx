import React from 'react';
import { Layout, Panel, AppBar } from 'react-toolbox';

const SimpleLayout = (Wrapped : any) => {
  return (props : any) => (
    <Layout>
      <Panel>
        <AppBar title='HouseCanary Order Manager' />
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          <Wrapped {...props} />
        </div>
      </Panel>
    </Layout>
  );
};

export default SimpleLayout;
