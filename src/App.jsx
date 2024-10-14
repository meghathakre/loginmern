import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import DashBoard from "./DashBoard";

const App=()=>{
  return(
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout/>} >
              <Route index element={<Home/>} />
              <Route path="home" element={<Home/>}/>   
              <Route path="dashboard" element={<DashBoard/>}/>         
            </Route>
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App;




  
