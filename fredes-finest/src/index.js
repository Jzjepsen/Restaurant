import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './services/UserContext';
import { MenuProvider } from './services/MenuContext';
import { StaffProvider} from './services/StaffContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <StaffProvider>
        <MenuProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MenuProvider>
      </StaffProvider>
    </UserProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
