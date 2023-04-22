import { Route, Routes } from 'react-router-dom';
import LoginButton from './components/LoginButton.js';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import SetRange from './pages/SetRange.js';
import { useStateContext } from './utils/stateContext';
import Navbar from './components/Navbar.js';

function App() {

  const { auth, showNavbar } = useStateContext();

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="App">
        {!auth.isAuthenticated && !auth.isLoading ? (
          <LoginButton /> 
          ): (
          <div>
            <Navbar />
            {!showNavbar &&
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/profile' element={<Profile />}/>
                <Route path='/set-range' element={<SetRange />}/>
              </Routes>
            }
          </div>
        )}
    </div>
  );
}

export default App;
