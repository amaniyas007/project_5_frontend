import "./App.css";
// import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/screens/MainPage"
import NoMatch from "./components/screens/NoMatch";
import LogIn from "./components/screens/LogIn";
import SignUp from "./components/screens/SignUp";
import Category from "./components/screens/Category";
import Store from "./components/context/store";



function App() {

    return (
        <>
            <Store>
                <Router>
                    <Routes>
                        <Route path="/home" element={<MainPage />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/signup/" element={<SignUp />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </Router>
            </Store>
        </>
    );
}

export default App;