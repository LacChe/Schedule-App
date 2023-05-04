import React, { createContext, useContext, useState, useEffect } from 'react';
import { userQuery, categoryQuery, systemCategoryQuery, taskTypeQuery, taskQuery, iconQuery } from '../utils/data.js';
import { client } from '../utils/client.js';
import { useAuth0 } from "@auth0/auth0-react";

const Context = createContext();

export const StateContext = ({ children }) => {

    const auth = useAuth0();

    const [userData, setUserData] = useState();
    const [iconData, setIconData] = useState();
    const [categories, setCategories] = useState();
    const [systemCategories, setSystemCategories] = useState();
    const [taskTypes, setTaskTypes] = useState();
    const [tasks, setTasks] = useState();
    const [showNavbar, setShowNavbar] = useState(false);
    const [showTools, setShowTools] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState();
    const [idFilters, setIdFilters] = useState([]);

    // clear storage and get from db
    const sync = () => {
      if(userData){
        //localStorage.clear();
        let query;

        query = categoryQuery(userData[0]._id);
        client.fetch(query)
        .then((data) => {
          //console.log('categoryQuery', JSON.stringify(data))
          setCategories(data);
          localStorage.setItem('categories', JSON.stringify(data));
        })

        query = systemCategoryQuery();
        client.fetch(query)
        .then((data) => {
          //console.log('categoryQuery', JSON.stringify(data))
          console.log('system category', 'sync')
          setSystemCategories(data);
          localStorage.setItem('system-categories', JSON.stringify(data));
        })
        
        query = taskTypeQuery(userData[0]._id);
        client.fetch(query)
        .then((data) => {
          //console.log('taskTypeQuery', JSON.stringify(data))
          console.log('task type', 'sync')
          setTaskTypes(data);
          localStorage.setItem('task-types', JSON.stringify(data));
        })

        query = taskQuery(userData[0]._id);
        client.fetch(query)
        .then((data) => {
          //console.log('taskQuery', JSON.stringify(data))
          console.log('task', 'sync')
          setTasks(data);
          localStorage.setItem('tasks', JSON.stringify(data));
        })

        query = iconQuery();
        client.fetch(query)
        .then((data) => {
          // console.log('iconQuery', JSON.stringify(data))
          console.log('icon', 'sync')
          setIconData(data);
          localStorage.setItem('icons', JSON.stringify(data));
        })
      }
    }

    // create user if does not exist
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

    // fetch user data
    useEffect(() => {
          // auth session is short on free plan, skip check if local storage has user data
          setUserData(JSON.parse(localStorage.getItem('user-data')) ? Object.values(JSON.parse(localStorage.getItem('user-data'))) : '');
          if(!localStorage.getItem('user-data')){
            if (auth.isAuthenticated) {
              // auth.logout({ logoutParams: { returnTo: window.location.origin } });
              // return;
              const query = userQuery(auth?.user?.sub.split('|')[1]);
              client.fetch(query)
              .then((data) => {
                //console.log('userQuery', JSON.stringify(data))
                setUserData(data);
                localStorage.setItem('user-data', JSON.stringify(data));
            })
          }
        }
    }, [auth])
    
    // fetch category data if not in local storage
      useEffect(() => {
          if(userData){
            setCategories(JSON.parse(localStorage.getItem('categories')) ? Object.values(JSON.parse(localStorage.getItem('categories'))) : '');
            if(!localStorage.getItem('categories')){
              const query = categoryQuery(userData[0]._id);
              client.fetch(query)
              .then((data) => {
                //console.log('categoryQuery', JSON.stringify(data))
                console.log('category', 'not found in storage, fetching from database')
                setCategories(data);
                localStorage.setItem('categories', JSON.stringify(data));
              })
            }
          }
      }, [userData])
    
      // fetch system category data if not in local storage
        useEffect(() => {
          if(userData){
            setSystemCategories(JSON.parse(localStorage.getItem('system-categories')) ? Object.values(JSON.parse(localStorage.getItem('system-categories'))) : '');
            if(!localStorage.getItem('system-categories')){
              const query = systemCategoryQuery();
              client.fetch(query)
              .then((data) => {
                //console.log('categoryQuery', JSON.stringify(data))
              console.log('system category', 'not found in storage, fetching from database')
                setSystemCategories(data);
                localStorage.setItem('system-categories', JSON.stringify(data));
              })
            }
          }
        }, [userData])
    
    // fetch tasktype data if not in local storage
      useEffect(() => {
        if(userData){
          setTaskTypes(JSON.parse(localStorage.getItem('task-types')) ? Object.values(JSON.parse(localStorage.getItem('task-types'))) : '');
          if(!localStorage.getItem('task-types')){
            const query = taskTypeQuery(userData[0]._id);
            client.fetch(query)
            .then((data) => {
              //console.log('taskTypeQuery', JSON.stringify(data))
              console.log('task type', 'not found in storage, fetching from database')
              setTaskTypes(data);
              localStorage.setItem('task-types', JSON.stringify(data));
            })
          }
        }
      }, [userData])
    
    // fetch task data if not in local storage
      useEffect(() => {
        if(userData){
          setTasks(JSON.parse(localStorage.getItem('tasks')) ? Object.values(JSON.parse(localStorage.getItem('tasks'))) : '');
          if(!localStorage.getItem('tasks')){
            const query = taskQuery(userData[0]._id);
            client.fetch(query)
            .then((data) => {
              //console.log('taskQuery', JSON.stringify(data))
              console.log('task', 'not found in storage, fetching from database')
              setTasks(data);
              localStorage.setItem('tasks', JSON.stringify(data));
            })
          }
        }
      }, [userData])    
      
      // fetch icon data if not in local storage
      useEffect(() => {
        if(userData){
          setIconData(JSON.parse(localStorage.getItem('icons')) ? Object.values(JSON.parse(localStorage.getItem('icons'))) : '');
          if(!localStorage.getItem('icons')){
            const query = iconQuery();
            client.fetch(query)
            .then((data) => {
              // console.log('iconQuery', JSON.stringify(data))
              console.log('icon', 'not found in storage, fetching from database')
              setIconData(data);
              localStorage.setItem('icons', JSON.stringify(data));
            })
          }
        }
      }, [userData])

    return (
        <Context.Provider
            value={{
                auth,
                userData,
                iconData,
                setIconData,
                categories,
                setCategories,
                systemCategories,
                setSystemCategories,
                taskTypes,
                setTaskTypes,
                tasks,
                setTasks,
                showNavbar,
                setShowNavbar,
                showTools,
                setShowTools,
                showSearch,
                setShowSearch,
                startDate,
                setStartDate,
                endDate,
                setEndDate,
                searchTerm,
                setSearchTerm,
                idFilters,
                setIdFilters,
                sync
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)