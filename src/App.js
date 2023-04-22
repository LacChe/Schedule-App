import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton.js';
import Profile from './components/Profile.js';
import { client } from './utils/client.js';
import { useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const auth = useAuth0();

  useEffect(() => {
    if(auth.user){
      const doc = {
        _id: auth.user?.sub.split('|')[1],
        _type: 'user',
        userName: auth.user?.name,
        imageUrl: auth.user?.picture,
        authType: auth.user?.sub.split('|')[0]
      }
      client.createIfNotExists(doc);
    }
  
  }, [auth])
  
  

  return (
    <div className="App">
      {!auth.isAuthenticated && !auth.isLoading ? (
        <LoginButton /> 
        ): (
        <div>
          <LogoutButton />
          <Profile />
        </div>
      )}
    </div>
  );
}

export default App;
