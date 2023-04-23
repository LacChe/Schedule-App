import { Route, Routes } from 'react-router-dom';
import { useStateContext } from './utils/stateContext';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import SetRange from './pages/SetRange.js';
import Navbar from './components/Navbar.js';
import CreateTaskType from './pages/CreateTaskType.js';
import CreateCategory from './pages/CreateCategory.js';

function App() {

  const { auth, showNavbar } = useStateContext();

  if (!auth.isAuthenticated && !auth.isLoading) {
    return (
      <button onClick={() => auth.loginWithRedirect()}>Log In</button>
    )
  }

  return (
    <div>
      <Navbar />
      {!showNavbar &&
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/set-range' element={<SetRange />}/>
          <Route path='/category/:id?/:name?/:hex?/:iconref?' element={<CreateCategory />}/>
          <Route path='/task/:id?/:name?/:unit?/:categoryref?/:iconref?' element={<CreateTaskType />}/>
          <Route path='/*' element={<div>ERROR</div>}/>
        </Routes>
      }
    </div>
  );
}

export default App;
