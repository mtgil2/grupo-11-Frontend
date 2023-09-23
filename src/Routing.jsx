import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import User from "./views/User";
import Buy from "./views/Buy";
import Stocks from "./views/Stocks";

function Routing(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App/>}/>
          <Route path={'/user'} element={<User/>}/>
          <Route path={'/buy'} element={<Buy/>}/>
          <Route path={'/stocks'} element={<Stocks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routing