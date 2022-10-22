import React from "react";
import { Api } from "./api/Api";
import Cards from "./components/Cards";
import { BrowserRouter  , Routes , Route } from "react-router-dom";
const App = () => {
  return (
   
     <>
      <BrowserRouter>
      <Api />
      <Routes>
        <Route path="/"   element={  <Cards />} />
        <Route path="/:year"   element={  <Cards />} />
      </Routes>
      </BrowserRouter>
     
     </>
     

  );
};

export default App;
