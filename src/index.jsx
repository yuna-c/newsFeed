// import { Provider } from 'react-redux';
// import { StrictMode } from 'react';
// import store from './redux/config/configStore';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/index.css';

// yarn add @supabase/supabase-js
// yarn add styled-components
// yarn add react-router-dom

createRoot(document.getElementById('root')).render(
  // <Provider store={store}> </Provider>
  // <StrictMode></StrictMode>
  <App />
);
