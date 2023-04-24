import { Route, Routes } from 'react-router-dom';
import { useStateContext } from './utils/stateContext';
import Home from './pages/Home.js';
import Profile from './pages/Profile.js';
import SetRange from './pages/SetRange.js';
import Navbar from './components/Navbar.js';
import CreateTaskType from './pages/CreateTaskType.js';
import CreateCategory from './pages/CreateCategory.js';
import { Toaster } from 'react-hot-toast';

function App() {

  const { auth } = useStateContext();

  if (!auth.isAuthenticated && !auth.isLoading) {
    return (
      <div className='login' >
        <button onClick={() => auth.loginWithRedirect()}>Log In</button>
      </div>
    )
  }

  return (
    <div>
      <div>
        <Toaster position="top-center"
          toastOptions={{
            success: {
              style: {
                background: '#367E18',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#367E18',
              }
            },
            error: {
              style: {
                background: '#EA5455',
                color: 'white',
              },
              iconTheme: {
                primary: 'white',
                secondary: '#EA5455',
              }
            },
          }}
        />
      </div>
      <Navbar />
      <Routes>
        <Route path='/home/:param?' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/set-range' element={<SetRange />}/>
        <Route path='/category/:id?/:name?/:hex?/:iconref?' element={<CreateCategory />}/>
        <Route path='/task/:id?/:name?/:unit?/:categoryref?/:iconref?' element={<CreateTaskType />}/>
        <Route path='/*' element={<div>ERROR</div>}/>
      </Routes>
    </div>
  );
}

export default App;
