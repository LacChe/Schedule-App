import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import SetRange from './components/SetRange.js';
import { useStateContext } from './utils/stateContext';
import Navbar from './components/Navbar.js';
import CreateTaskType from './components/CreateTaskType.js';
import CreateCategory from './components/CreateCategory.js';

function App() {

  const { auth, showNavbar } = useStateContext();

  if (!auth.isAuthenticated && !auth.isLoading) {
    return (
      <button onClick={() => auth.loginWithRedirect()}>Log In</button>
    )
  }

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
      <Navbar />
      {!showNavbar &&
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/set-range' element={<SetRange />}/>
          <Route path='/category' element={<CreateCategory />}/>
          <Route path='/task' element={<CreateTaskType />}/>
        </Routes>
      }
    </div>
  );
}

export default App;
