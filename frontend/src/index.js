import React from 'react';
import ReactDOM from 'react-dom/client';

import { 
  createBrowserRouter,
  createRoutesFromElements, 
  RouterProvider, 
  Route 
} from "react-router-dom";

import './styles/index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';
import Search from './Search';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />} />
      <Route path='signin' element={<SignIn />}/>
      <Route path='search/:params' element={<Search />}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
