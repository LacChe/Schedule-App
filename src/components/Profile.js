import React from "react";
import { useStateContext } from '../utils/stateContext';
import { urlFor } from '../utils/client.js';

const Profile = () => {
  const { auth, userData, categories, taskTypes, tasks } = useStateContext();

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
            <br/>

            <div>
              <h1>User Info</h1>
              {userData?.map((item) => (
              <div key={item._id}>
                <p>{item._id}</p>
                <p>{item.userName}</p>
                <p>{item.authType}</p>
                <img src={item.imageUrl} alt='user' />
              </div>))}
            </div>

            <div>
              <h1>Category Info</h1>
              {categories?.map((item) => (
              <div key={item._id}>
                <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${item.color.hex}`, 'color' : `white`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
                  <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(item.icon.lightImage)} alt='category' />
                  <p>{item.name}</p>
                </div>
                <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${item.color.hex}`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
                  <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(item.icon.darkImage)} alt='category' />
                  <p>{item.name}</p>
                </div>
              </div>))}
            </div>

            <div>
              <h1>TaskType Info</h1>
              {taskTypes?.map((item) => (
              <div key={item._id}>
                <p>{item.unit}</p>
                <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${categories?.filter((cat) => cat._id === item.category._id)[0].color.hex}`, 'color' : `white`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
                  <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(item.icon.lightImage)} alt='category' />
                  <p>{item.name}</p>
                </div>
                <div style={{'display' : 'flex', 'alignItems' : 'center', 'borderRadius': '20px', 'backgroundColor' : `${categories?.filter((cat) => cat._id === item.category._id)[0].color.hex}`, 'padding': '5px', 'margin': '5px', 'width': 'fit-content', 'height': '40px'}}>
                  <img style={{'marginRight': '5px', "height" : '32px', "width" : '32px'}} src={urlFor(item.icon.darkImage)} alt='category' />
                  <p>{item.name}</p>
                </div>
              </div>))}
            </div>
            <p>{JSON.stringify(tasks)}</p>
        </div>
        )}
    </>
  );
};

export default Profile;