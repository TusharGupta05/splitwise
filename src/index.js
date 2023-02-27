import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import Splitwise from './pages/splitwise';
import reduxStore from './redux';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1ac29f',
            },
          }}
        >
          <Splitwise />
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
