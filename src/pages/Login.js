import React, { useEffect } from 'react'
import { useStateContext } from '../utils/stateContext.js'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const { auth, userData } = useStateContext();

    useEffect(() => {
        if (localStorage.getItem('user-data') || auth.isAuthenticated) {
          navigate('/')
        }
    }, [auth])

    return (
        <div className='login' >
          { auth.isLoading? <h1>Loading...</h1> : 
            <button onClick={() => auth.loginWithRedirect()}>Log In</button> 
          }
        </div>
      )
}

export default Login