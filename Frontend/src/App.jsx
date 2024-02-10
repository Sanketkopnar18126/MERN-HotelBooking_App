import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation/Navigation";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
       <Route index element={<Navigation/>} >


       </Route>
       </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
