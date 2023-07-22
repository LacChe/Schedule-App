import React, { useEffect } from 'react'
import { useStateContext } from '../utils/stateContext.js'
import { useNavigate } from 'react-router-dom';
import { Grid } from  'react-loader-spinner'
import { Day, Filter } from '../components';
import { demoTasks, demoTaskTypes, demoCategories, demoSystemCategories, demoIcons } from '../utils/demoData.js';

const Login = () => {
    const navigate = useNavigate();

    const { auth } = useStateContext();
    const { setTasks, setTaskTypes, setCategories, setSystemCategories, setIconData } = useStateContext();

    setTasks(demoTasks);
    setTaskTypes(demoTaskTypes);
    setCategories(demoCategories);
    setSystemCategories(demoSystemCategories);
    setIconData(demoIcons);

    useEffect(() => {
        if (localStorage.getItem('user-data') || auth.isAuthenticated) {
          navigate('/')
        }
    }, [auth, navigate])

    return (
        <div className='login' >
          { auth.isLoading ? 
            <div className='spinner'>
              <Grid
                  height="80"
                  width="80"
                  color="#002B5B"
                  ariaLabel="grid-loading"
                  radius="12.5"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
              />
            </div>
            : 
            <>
              <button onClick={() => auth.loginWithRedirect()}>Log In</button>
              <div>
                <Day isDemo={true} expandedIndex={0} />
              </div>
            </>
          }
        </div>
      )
}

export default Login