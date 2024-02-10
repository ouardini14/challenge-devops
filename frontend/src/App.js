import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import GuardedRoute from "./GuardedRoutes/GuardedRoute";

import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Admin from "./Pages/Admin/Admin";
import Admins from "./Pages/Admin/Admins";
import Authors from "./Pages/Admin/Authors";

import Home from "./Pages/Home";
import Books from "./Pages/Books";
import BookDetails from "./Pages/BookDetails";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Library from "./Pages/Library";
import GuardedUserRoutes from "./GuardedRoutes/GuardedUserRoutes";
import Reader from "./Pages/Reader";
import BooksByAuthor from "./Pages/BooksByAuthor";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="page" className="min-h-[100vh] scrollbar-thumb-gray-900 scrollbar-thin">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Books" element={<Books />} />
        <Route path="/Book/:BookId" element={<BookDetails />} />
        <Route path="/Author/:AuthorId" element={<BooksByAuthor />} />


         {/* Admin Routes*/}
        <Route  element={<GuardedRoute  />}>

        <Route path="/Admin" element={<Admin />} >
        <Route index  path="Admins" element={<Admins />} />
        <Route path="Authors" element={<Authors />} />

        </Route>


        </Route>

         {/* Signed In User Routes*/}
        <Route  element={<GuardedUserRoutes  />}>
        <Route path="/Library" element={<Library />} />
        <Route path="/Reader/:BookId" element={<Reader />} />
        </Route>

        <Route path="/SignIn" exact element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />

      </Routes></div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
