import { Route, Routes, useNavigate } from 'react-router-dom';
import { useStateContext } from './utils/stateContext';
import { Login, Home, AddPage, Profile, SetRange, CreateTaskType, CreateCategory } from './pages';
import { Navbar } from './components';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

function App() {

  const { auth } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user-data') && !auth.isAuthenticated && !auth.isLoading) {
      navigate('/login')
    }
  }, [auth, navigate])

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
        <Route path='/add/:returnPage?/:id?/:dateParam?/:taskParam?/:amountParam?/:notesParam?' element={<AddPage />}/>
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
