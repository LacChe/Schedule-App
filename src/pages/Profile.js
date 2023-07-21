import React from "react";
import { useStateContext } from '../utils/stateContext';
import { useNavigate } from 'react-router-dom';
import { ProfileTaskBubble, ProfileCategoryBubble } from '../components'
import { Grid } from  'react-loader-spinner'

const Profile = () => {
  const { userData, categories, systemCategories, taskTypes, sync, loaded } = useStateContext();
  const navigate = useNavigate();

  if(!loaded()) {
    return (
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
    )
  }

  return (
    <div className='profile-main'>
    {userData ?
      (
      <div>
        <div className='profile-heading'>
            <img src={userData[0]?.imageUrl} alt='user-avatar' referrerPolicy="no-referrer"/>
            <h1>{userData[0]?.userName}</h1>
        </div>
        <div className='profile-item-list'>
          <h1>Tasks</h1>
          {taskTypes?.length === 0 ? 
          <div className='empty'>Empty</div> : 
          taskTypes?.map((item) => <ProfileTaskBubble key={item._id} task={item}/>)}
          <button className='profile-new-item-button' type='button' onClick={()=> {
            navigate('/task');
          }}>New Task</button>
        </div>
        <div className='profile-item-list'>
          <h1>Categories</h1>
          {categories?.map((item) => <ProfileCategoryBubble key={item._id} cat={item}/>)}
          {systemCategories?.map((item) => <ProfileCategoryBubble key={item._id} cat={item}/>)}
          <button className='profile-new-item-button' type='button' onClick={()=> {
            navigate('/category');
          }}>New Category</button>
        </div>
        <div className='sync-wrapper'>
          <p className='sync-text'>Something not showing up?</p>
          <button className='button-alt-color  sync-button' onClick={sync}>
            Sync
          </button>
          <a href="https://www.flaticon.com/" title="icons">
            Icons created by Freepik - Flaticon
          </a>
        </div>
      </div>) :
    <p>Loading...</p>
    }
    </div>
  ); 
};

export default Profile;