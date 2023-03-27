import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./fontawesome.js"
import './App.css';
import routes from './routes/routes';


function App() {
  return (
    
    <BrowserRouter>
    <Routes>
      {
        routes.map((route)=>{
          return <Route element={route.element} path={route.path} key= {route.path}></Route>
        })
      }
    </Routes>
    </BrowserRouter>
  );
}

export default App;
