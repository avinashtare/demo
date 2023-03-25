import './App.css';
import About from './components/About';
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Alert from './components/Alert';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logout from './components/Logout';
import NotFound from './components/NotFound';
// cosntext api
import NoteState from './context/notes/NoteState';
import AlertState from './context/alert/AlertState';
import LoginState from './context/authentication/LoginState';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <LoginState>
        <NoteState>
          <AlertState>
            <Router>
              <Alert />
              <Navbar />
              <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home />} />
                  <Route exact path="/about" element={<About />} />
                  <Route exact path="/login" element={<Login />} />
                  <Route exact path="/signup" element={<SignUp />} />
                  <Route exact path="/logout" element={<Logout />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </div>
            </Router>
          </AlertState>
        </NoteState>
      </LoginState>
    </>
  );
}

export default App;
