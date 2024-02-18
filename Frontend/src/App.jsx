import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation/Navigation";
import { SignUp } from "./Pages/SignUp/SignUp";
import { SignIn } from "./Pages/SignIn/SignIn";
import { persistStor, store } from "./Store/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddHotel } from "./Pages/AddHotel/AddHotel.jsx";
import { MyHotels } from "./Pages/MyHotels/MyHotels.jsx";
import { Search } from "./Pages/Search/Search.jsx";
import { Details } from "./Pages/Details/Details.jsx";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigation />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/add-hotel" element={<AddHotel/>}/>
              <Route path="/myhotels" element={<MyHotels/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/detail/:id" element={<Details/>}/>

            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
      <ToastContainer

      />
    </Provider>
  );
}

export default App;
