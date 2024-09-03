// import { Provider } from 'react-redux';
// import { StrictMode } from 'react';
// import store from './redux/config/configStore';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './styles/index.css';

// yarn add @supabase/supabase-js
// yarn add styled-components
// yarn add react-router-dom
// yarn add styled-reset

// 사용 유무 미정
// yarn add redux react-redux
// yarn add react-redux @reduxjs/toolkit
// yarn add @toast-ui/react-editor
// yarn add uuid

createRoot(document.getElementById('root')).render(
  // <Provider store={store}> </Provider>
  // <StrictMode></StrictMode>
  <App />
);
