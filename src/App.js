import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fontawesome.js"
import './App.css';
import routes from './routes/routes';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from './redux/Auth/auth_page_selecter.js';
import Page404 from './pages/Error/404.jsx';


function App() {
  const auth = useSelector(selectAuth);
  return (
    <BrowserRouter>
      <Routes>
        {
          React.Children.toArray(routes.map((route) => {
            return (
            <>
              {route.allowed === 1?
               <Route element={
                (auth?.roles.some((rol)=>rol ==="ROLE_USER") === true||auth === null)?
                route.element:<Page404 path={"/system_mienspa"}/>
              } path={route.path} key={route.path}></Route>:
               route.allowed === 2?
               <Route element={
                route.element
                /auth?.roles.some((rol)=>rol ==="ROLE_USER") === true?
                 route.element:<Page404 path={"/"}/>
              } path={route.path} key={route.path}></Route>:
               route.allowed === 3?
               <Route element={
                auth?.roles.some((rol)=>rol !=="ROLE_USER") === true?
                route.element:<Page404 path={"/"}/>
              } path={route.path} key={route.path}></Route>
               :null
              }
             
            </>
            )
          }))
        }
      </Routes>
    </BrowserRouter>
  );
}

export default App;
