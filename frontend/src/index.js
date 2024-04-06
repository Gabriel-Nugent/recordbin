import React from 'react';
import ReactDOM from 'react-dom/client';

import { 
  createBrowserRouter,
  createRoutesFromElements, 
  RouterProvider, 
  Route,
} from "react-router-dom";

import './styles/index.css';
import Home from './Home';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';
import Search from './Search';
import Profile from './Profile';
import CreateAcc from './CreateAcc';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />} />
      <Route path='signin' element={<SignIn />}/>
      <Route path='create-account' element={<CreateAcc/>} />
      <Route path='search/:params/:pagenum' element={<Search />}/>
      <Route path='release/:artist/:name' />
      <Route path='profile/:user_id' element={<Profile />}/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
