
import './App.css';
import { NavBar } from './components/Navbar/navbar';
import { LoginPage } from './components/Signin-file/login-page';
import { SignUp } from './components/Signup-file/signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Invalid } from './components/invalid';
import { Home } from './components/Home';
// import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <header>
          <NavBar />
        </header>
        <section className="mt-4">
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='home' element={<Home />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='navbar' element={<NavBar />} />
            <Route path='invalid' element={<Invalid />} />
            <Route path='*' element={<code><h3 className="danger">O..oo you are getting 404, not found page !</h3></code>} />
          </Routes>
        </section>
      </BrowserRouter>


    </div>
  );
}

export default App;
