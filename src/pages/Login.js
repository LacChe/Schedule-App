import React, { useEffect } from 'react'
import { useStateContext } from '../utils/stateContext.js'
import { useNavigate } from 'react-router-dom';
import { Grid } from  'react-loader-spinner'
import { Day } from '../components';
import CountUp from 'react-countup';
import { demoTasks, demoTaskTypes, demoCategories, demoSystemCategories, demoIcons } from '../utils/demoData.js';

const Login = () => {
    const navigate = useNavigate();

    const { auth } = useStateContext();
    const { setTasks, setTaskTypes, setCategories, setSystemCategories, setIconData, taskCount } = useStateContext();
    
    useEffect(() => {
        if (localStorage.getItem('user-data') || auth.isAuthenticated) {
          navigate('/')
        }
        setTasks(demoTasks);
        setTaskTypes(demoTaskTypes);
        setCategories(demoCategories);
        setSystemCategories(demoSystemCategories);
        setIconData(demoIcons);
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
              <div className='task-count'>
                <CountUp
                  start={0}
                  end={taskCount}
                  duration={2.75}
                  separator=","
                >
                  {({ countUpRef }) => (
                    <div>
                      <span ref={countUpRef} />
                      Tasks Logged
                    </div>
                  )}
                </CountUp>
              </div>
              <button onClick={() => auth.loginWithRedirect()}>Sign In</button>
              <div>
                <Day isDemo={true} expandedIndex={0} />
              </div>
            </>
          }
        </div>
      )
}

export default Login