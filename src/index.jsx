import { Provider } from 'react-redux';
import store from './redux/config/configStore';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/index.css';

// yarn add @supabase/supabase-js

// yarn add styled-components
// yarn add react-router-dom
// yarn add uuid

// 사용 유무 몰루?
// yarn add redux react-redux
// yarn add react-redux @reduxjs/toolkit

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
);
