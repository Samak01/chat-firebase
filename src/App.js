import React, { useContext } from "react";
import LogIn from "./register/LogIn";
import Register from "./register/Register";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import Home from "./Home";
import AuthContext from "./context/AuthContext";
import AuthContextProvider from "./context/AuthContext";

function App() {

  const  currentUser = useContext(AuthContext)
  
  const RenderedRoute  = ({children}) => {
    if(currentUser == !currentUser){
      return <Navigate to='/login' />
    }
      return children
    }

  return (
<>
  <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
            <RenderedRoute>
              <Home />
            </RenderedRoute>
          } />
          <Route path="login" exact element={<LogIn />} />
          <Route path="register"  element={<Register />} />
        </Route>
      </Routes>
  </BrowserRouter>

</>
  
  );
}

export default App;
