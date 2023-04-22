import LoginButton from './components/LoginButton.js';
import LogoutButton from './components/LogoutButton.js';
import Profile from './components/Profile.js';
import { useStateContext } from './utils/stateContext';

function App() {

  const { auth } = useStateContext();

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
