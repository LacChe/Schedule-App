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
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
        if(auth.user){
          const query = userQuery(auth?.user?.sub.split('|')[1]);
          client.fetch(query)
          .then((data) => {
            //console.log('userQuery', JSON.stringify(data))
            setUserData(data);
          })
        }
    }, [auth])
    
    // fetch category data
      useEffect(() => {
        if(auth.user){
          const query = categoryQuery(auth?.user?.sub.split('|')[1]);
          client.fetch(query)
          .then((data) => {
            //console.log('categoryQuery', JSON.stringify(data))
            setCategories(data);
          })
        }
      }, [auth])
    
      // fetch system category data
        useEffect(() => {
          if(auth.user){
            const query = systemCategoryQuery();
            client.fetch(query)
            .then((data) => {
              //console.log('categoryQuery', JSON.stringify(data))
              setSystemCategories(data);
            })
          }
        }, [auth])
    
    // fetch tasktype data
      useEffect(() => {
        if(auth.user){
          const query = taskTypeQuery(auth?.user?.sub.split('|')[1]);
          client.fetch(query)
          .then((data) => {
            //console.log('taskTypeQuery', JSON.stringify(data))
            setTaskTypes(data);
          })
        }
      }, [auth])
    
    // fetch task data
      useEffect(() => {
        if(auth.user){
          const query = taskQuery(auth?.user?.sub.split('|')[1]);
          client.fetch(query)
          .then((data) => {
            //console.log('taskQuery', JSON.stringify(data))
            setTasks(data);
          })
        }
      }, [auth])    
      
      // fetch icon data
      useEffect(() => {
        const query = iconQuery();
        client.fetch(query)
        .then((data) => {
          // console.log('iconQuery', JSON.stringify(data))
          setIconData(data);
        })
      }, [])

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
                showNavbar,
                setShowNavbar,
                startDate,
                setStartDate,
                endDate,
                setEndDate
            }}
        >
            { children }
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)