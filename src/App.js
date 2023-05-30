import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fontawesome.js"
import './App.css';
import routes from './routes/routes';
import React, { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import Page404 from './pages/Error/404.jsx';
import { getUserById } from './redux/User/user_page_thunk.js';



function App() {
  const [user,setUser] = useState(null);
  const [idUser,]=useState(
  localStorage.getItem("ck") === null?
  sessionStorage.getItem("uId"):
  localStorage.getItem("uId"));
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("ck") === null){
      if(sessionStorage.getItem("token") !== null){
        dispatch(getUserById(sessionStorage.getItem("uId"))).then((res) => {
          setUser(res.payload);
        });
      }
    }else{
      dispatch(getUserById(localStorage.getItem("uId"))).then((res) => {
        setUser(res.payload);
      });
    }   
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {
          React.Children.toArray(routes.map((route) => {
            return (             
            <>
              {route.allowed === 1?
               <Route element={
                (user?.listRole.some((rol)=>rol ==="ROLE_USER") === true||user === null)?
                route.element:<Page404 path={"/system_mienspa"}/>
              } path={route.path} key={route.path}></Route>:
               route.allowed === 2?
               <Route element={
                user?.listRole.some((rol)=>rol ==="ROLE_USER") === true && idUser !== null?
                 route.element:<Page404 path={"/"}/>
              } path={route.path} key={route.path}></Route>:
               route.allowed === 3?
               <Route element={
                user?.listRole.some((rol)=>rol !=="ROLE_USER") === true && idUser !== null?
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
