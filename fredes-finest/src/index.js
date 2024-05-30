import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './services/UserContext';
import { MenuProvider } from './services/MenuContext';
import { StaffProvider} from './services/StaffContext';
import { OrderProvider } from './services/OrderContext';
import { BookingProvider } from './services/BookingContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BookingProvider>
        <OrderProvider>
          <StaffProvider>
            <MenuProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MenuProvider>
          </StaffProvider>
        </OrderProvider>
      </BookingProvider>
    </UserProvider>
  </React.StrictMode>
);
