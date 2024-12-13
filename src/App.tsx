import './App.css'
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/home";
import Login from "./components/Login";
import Register from "./components/Register";
import Search from "./components/Search";
import Details from "./components/Details";
import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <>
      <HashRouter>
          <div>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/details/:did" element={<Details />} />
                  <Route path="/profile/" element={<Profile />} />
                  <Route path="/profile/:uid" element={<Profile />} />
              </Routes>
          </div>
      </HashRouter>
    </>
  )
}

export default App