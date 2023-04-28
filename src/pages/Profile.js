import React from "react";
import { useStateContext } from '../utils/stateContext';
import { useNavigate } from 'react-router-dom';
import ProfileTaskBubble from '../components/ProfileTaskBubble.js'
import ProfileCategoryBubble from '../components/ProfileCategoryBubble.js'

const Profile = () => {
  const { userData, categories, systemCategories, taskTypes, sync } = useStateContext();
  const navigate = useNavigate();

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
          {taskTypes?.length === 0 ? <div className='empty'>Empty</div> : taskTypes?.map((item) => <ProfileTaskBubble key={item._id} task={item}/>)}
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