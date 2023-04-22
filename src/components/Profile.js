import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { client } from '../utils/client.js';
import { userQuery, categoryQuery, taskTypeQuery, taskQuery } from '../utils/data.js';

const Profile = () => {
  const auth = useAuth0();

  useEffect(() => {
    if(auth.user){
      const query = userQuery(auth?.user?.sub.split('|')[1]);
      client.fetch(query)
      .then((data) => {
        console.log('userQuery', JSON.stringify(data))
      })
    }
  }, [auth])

  useEffect(() => {
    if(auth.user){
      const query = categoryQuery(auth?.user?.sub.split('|')[1]);
      client.fetch(query)
      .then((data) => {
        console.log('categoryQuery', JSON.stringify(data))
      })
    }
  }, [auth])

  useEffect(() => {
    if(auth.user){
      const query = taskTypeQuery(auth?.user?.sub.split('|')[1]);
      client.fetch(query)
      .then((data) => {
        console.log('taskTypeQuery', JSON.stringify(data))
      })
    }
  }, [auth])

  useEffect(() => {
    if(auth.user){
      const query = taskQuery(auth?.user?.sub.split('|')[1]);
      client.fetch(query)
      .then((data) => {
        console.log('taskQuery', JSON.stringify(data))
      })
    }
  }, [auth])

  if (auth.isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
        {auth.isAuthenticated && (
        <div>
            <img src={auth.user.picture} alt={auth.user.name} />
            <h2>{auth.user.name}</h2>
            <p>{auth.user.email}</p>
        </div>
        )}
    </>
  );
};

export default Profile;