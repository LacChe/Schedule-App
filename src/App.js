import { Route, Routes, useNavigate } from 'react-router-dom';
import { useStateContext } from './utils/stateContext';
import Login from './pages/Login.js';
import Home from './pages/Home.js';
import Add from './pages/AddPage.js';
import Profile from './pages/Profile.js';
import SetRange from './pages/SetRange.js';
import Navbar from './components/Navbar.js';
import CreateTaskType from './pages/CreateTaskType.js';
import CreateCategory from './pages/CreateCategory.js';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {

  const { userData, auth } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user-data')) {
      navigate('/login')
    }
  }, [auth, userData])

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
      {localStorage.getItem('user-data') && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />}/>
        <Route path='/:pageParam?/:dateParam?' element={<Home />}/>
        <Route path='/add/:returnPage?/:id?/:dateParam?/:taskParam?/:amountParam?/:notesParam?' element={<Add />}/>
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
