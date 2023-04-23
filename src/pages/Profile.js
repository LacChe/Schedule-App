import React from "react";
import { useStateContext } from '../utils/stateContext';
import { useNavigate } from 'react-router-dom';
import ProfileTaskBubble from '../components/ProfileTaskBubble.js'
import ProfileCategoryBubble from '../components/ProfileCategoryBubble.js'

const Profile = () => {
  const { userData, categories, taskTypes } = useStateContext();
  const navigate = useNavigate();

  if (!userData) {
    return <div>Loading ...</div>;
  }

  return (
    <div>

      <div>
          <img src={userData[0]?.imageUrl} alt='user-avatar' />
          <h1>{userData[0]?.userName}</h1>
      </div>

      <div>
        <h1>Task</h1>
        {taskTypes?.length === 0 ? <div>No Tasks</div> : taskTypes?.map((item) => <ProfileTaskBubble key={item._id} task={item}/>)}
        <button type='button' onClick={()=> {
          navigate('/task');
        }}>New Task Type</button>
      </div>
      
      <div>
        <h1>Categories</h1>
        {categories?.map((item) => <ProfileCategoryBubble key={item._id} cat={item}/>)}
        <button type='button' onClick={()=> {
          navigate('/category');
        }}>New Category</button>
      </div>

    </div>
  );
};

export default Profile;