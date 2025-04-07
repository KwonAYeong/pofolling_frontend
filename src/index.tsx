import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ 라우터
import App from './App'; // ✅ App.tsx 불러오기
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {}
    </BrowserRouter>
  </React.StrictMode>
);
